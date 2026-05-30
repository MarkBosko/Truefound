import { NextRequest, NextResponse } from "next/server"
import { verifyAdminSession } from "@/lib/admin-auth"
import { prisma } from "@/lib/db"

type Params = { params: Promise<{ id: string }> }

export async function POST(_: NextRequest, { params }: Params) {
  if (!(await verifyAdminSession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const film = await prisma.film.findUnique({ where: { id } })
  if (!film) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const updated = await prisma.film.update({
    where: { id },
    data: { active: !film.active },
  })
  return NextResponse.json(updated)
}
