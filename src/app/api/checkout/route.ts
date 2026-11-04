import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { sendWatchEmail } from "@/lib/email"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function POST(req: NextRequest) {
  const { filmId, type, promoCode, email } = await req.json()

  const film = await prisma.film.findUnique({ where: { id: filmId, active: true } })
  if (!film) return NextResponse.json({ error: "Film not found" }, { status: 404 })

  const isRental = type === "RENTAL"
  const baseAmount = isRental ? film.rentalPrice : film.purchasePrice
  const label = isRental ? "48-hour Rental" : "Purchase"

  let discountCents = 0
  let promoCodeId: string | undefined

  if (promoCode) {
    const code = String(promoCode).trim().toUpperCase()
    const promo = await prisma.promoCode.findUnique({ where: { code } })
    const validDiscount =
      promo &&
      !promo.usedAt &&
      promo.expiresAt !== null && promo.expiresAt > new Date() &&
      promo.discountCents !== null &&
      (promo.filmId === null || promo.filmId === filmId)
    if (validDiscount) {
      discountCents = promo!.discountCents!
      promoCodeId = promo!.id
    }
  }

  const amount = Math.max(0, baseAmount - discountCents)

  // Free film — skip Stripe, create order directly
  if (amount === 0) {
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 })

    const expiresAt = isRental ? new Date(Date.now() + 48 * 60 * 60 * 1000) : null

    const order = await prisma.order.create({
      data: {
        filmId,
        type,
        amountCents: 0,
        customerEmail: email,
        expiresAt,
        ...(promoCodeId ? { promoCodeId } : {}),
      },
    })

    if (promoCodeId) {
      await prisma.promoCode.update({
        where: { id: promoCodeId },
        data: { usedAt: new Date(), usedByEmail: email },
      })
    }

    const watchUrl = `${BASE_URL}/watch/${order.accessToken}`

    await sendWatchEmail({
      to: email,
      filmTitle: film.title,
      orderType: type,
      watchUrl,
      expiresAt,
    })

    return NextResponse.json({ url: watchUrl })
  }

  // Paid film — Stripe checkout
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: `${film.title} — ${label}`,
            images: [film.posterUrl],
          },
        },
        quantity: 1,
      },
    ],
    customer_creation: "always",
    metadata: {
      filmId: film.id,
      type,
      promoCodeId: promoCodeId ?? "",
    },
    success_url: `${BASE_URL}/checkout/success`,
    cancel_url: `${BASE_URL}/films/${film.slug}`,
  })

  return NextResponse.json({ url: session.url })
}
