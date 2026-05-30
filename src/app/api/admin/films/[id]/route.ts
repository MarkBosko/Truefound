import { NextRequest, NextResponse } from "next/server"
import { verifyAdminSession } from "@/lib/admin-auth"
import { prisma } from "@/lib/db"

type Params = { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await verifyAdminSession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const film = await prisma.film.update({ where: { id }, data: body })
  return NextResponse.json(film)
}

export async function DELETE(_: NextRequest, { params }: Params) {
  if (!(await verifyAdminSession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  await prisma.film.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
