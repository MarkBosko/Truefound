import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { sendRentalFollowUpEmail } from "@/lib/email"

export const runtime = "nodejs"

function generateDiscountCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const now = new Date()
  const from = new Date(now.getTime() - 49 * 60 * 60 * 1000)
  const to   = new Date(now.getTime() - 47 * 60 * 60 * 1000)

  const orders = await prisma.order.findMany({
    where: {
      type: "RENTAL",
      createdAt: { gte: from, lte: to },
      followUpSentAt: null,
      amountCents: { gt: 0 },
    },
    include: { film: true },
  })

  let sent = 0
  for (const order of orders) {
    let code = generateDiscountCode()
    for (let i = 0; i < 5; i++) {
      const existing = await prisma.promoCode.findUnique({ where: { code } })
      if (!existing) break
      code = generateDiscountCode()
    }

    await prisma.promoCode.create({
      data: {
        code,
        filmId: null,
        discountCents: 100,
        expiresAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    await sendRentalFollowUpEmail({
      to: order.customerEmail,
      filmTitle: order.film.title,
      discountCode: code,
    })

    await prisma.order.update({
      where: { id: order.id },
      data: { followUpSentAt: now },
    })

    sent++
  }

  return NextResponse.json({ processed: sent })
}
