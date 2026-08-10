import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { verifyAdminSession } from "@/lib/admin-auth"

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

export async function GET() {
  if (!(await verifyAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const codes = await prisma.promoCode.findMany({
    include: { film: { select: { title: true } } },
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(codes)
}

export async function POST(req: Request) {
  if (!(await verifyAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { filmId } = await req.json()
  if (!filmId) return NextResponse.json({ error: "filmId required" }, { status: 400 })

  const expiresAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)

  // Retry on collision (extremely unlikely)
  let code = generateCode()
  for (let i = 0; i < 5; i++) {
    const existing = await prisma.promoCode.findUnique({ where: { code } })
    if (!existing) break
    code = generateCode()
  }

  const promo = await prisma.promoCode.create({
    data: { code, filmId, expiresAt },
    include: { film: { select: { title: true } } },
  })

  return NextResponse.json(promo)
}
