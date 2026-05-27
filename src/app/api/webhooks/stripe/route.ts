import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/db"
import { sendWatchEmail } from "@/lib/email"
import Stripe from "stripe"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    const filmId = session.metadata?.filmId
    const type = session.metadata?.type as "RENTAL" | "PURCHASE"
    const customerEmail = session.customer_details?.email

    if (!filmId || !type || !customerEmail) {
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 })
    }

    const film = await prisma.film.findUnique({ where: { id: filmId } })
    if (!film) return NextResponse.json({ error: "Film not found" }, { status: 404 })

    const expiresAt =
      type === "RENTAL"
        ? new Date(Date.now() + 48 * 60 * 60 * 1000)
        : null

    const order = await prisma.order.create({
      data: {
        filmId,
        type,
        amountCents: session.amount_total ?? 0,
        stripePaymentIntentId: session.payment_intent as string,
        customerEmail,
        expiresAt,
      },
    })

    const watchUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/watch/${order.accessToken}`

    await sendWatchEmail({
      to: customerEmail,
      filmTitle: film.title,
      orderType: type,
      watchUrl,
      expiresAt,
    })
  }

  return NextResponse.json({ received: true })
}
