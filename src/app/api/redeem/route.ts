import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { sendWatchEmail } from "@/lib/email"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function POST(req: Request) {
  const { code, email, filmId } = await req.json()

  if (!code || !email || !filmId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const promo = await prisma.promoCode.findUnique({ where: { code: code.trim().toUpperCase() } })

  if (!promo)                       return NextResponse.json({ error: "Code not found" }, { status: 404 })
  if (promo.filmId !== filmId)      return NextResponse.json({ error: "Code not valid for this film" }, { status: 400 })
  if (promo.usedAt)                 return NextResponse.json({ error: "Code has already been used" }, { status: 400 })
  if (promo.expiresAt < new Date()) return NextResponse.json({ error: "Code has expired" }, { status: 400 })

  const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000)

  const order = await prisma.order.create({
    data: {
      filmId,
      type: "RENTAL",
      amountCents: 0,
      customerEmail: email,
      expiresAt,
      promoCodeId: promo.id,
    },
  })

  await prisma.promoCode.update({
    where: { id: promo.id },
    data: { usedAt: new Date(), usedByEmail: email },
  })

  const film = await prisma.film.findUnique({ where: { id: filmId } })
  const watchUrl = `${BASE_URL}/watch/${order.accessToken}`

  await sendWatchEmail({
    to: email,
    filmTitle: film!.title,
    orderType: "RENTAL",
    watchUrl,
    expiresAt,
  })

  return NextResponse.json({ ok: true })
}
