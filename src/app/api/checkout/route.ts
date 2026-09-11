import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { stripe } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  const { filmId, type, promoCode } = await req.json()

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
      promo.expiresAt > new Date() &&
      promo.discountCents !== null &&
      (promo.filmId === null || promo.filmId === filmId)
    if (validDiscount) {
      discountCents = promo!.discountCents!
      promoCodeId = promo!.id
    }
  }

  const amount = Math.max(50, baseAmount - discountCents)

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
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/films/${film.slug}`,
  })

  return NextResponse.json({ url: session.url })
}
