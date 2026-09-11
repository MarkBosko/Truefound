import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code")?.trim().toUpperCase()
  if (!code) return NextResponse.json({ error: "Code required" }, { status: 400 })

  const promo = await prisma.promoCode.findUnique({ where: { code } })
  if (!promo)          return NextResponse.json({ error: "Code not found" }, { status: 404 })
  if (promo.usedAt)    return NextResponse.json({ error: "Code already used" }, { status: 400 })
  if (promo.expiresAt < new Date()) return NextResponse.json({ error: "Code has expired" }, { status: 400 })

  const isDiscount = promo.discountCents !== null
  return NextResponse.json({
    valid: true,
    type: isDiscount ? "DISCOUNT" : "SCREENER",
    discountCents: promo.discountCents ?? 0,
    filmId: promo.filmId ?? null,
  })
}
