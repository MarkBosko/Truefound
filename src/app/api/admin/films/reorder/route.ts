import { NextRequest, NextResponse } from "next/server"
import { verifyAdminSession } from "@/lib/admin-auth"
import { prisma } from "@/lib/db"

export async function POST(req: NextRequest) {
  if (!(await verifyAdminSession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const updates = (await req.json()) as { id: string; sortOrder: number }[]

  await prisma.$transaction(
    updates.map(({ id, sortOrder }) =>
      prisma.film.update({ where: { id }, data: { sortOrder } })
    )
  )

  return NextResponse.json({ ok: true })
}
