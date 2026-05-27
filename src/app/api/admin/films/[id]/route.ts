import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

type Params = { params: Promise<{ id: string }> }

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return !!session
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const film = await prisma.film.update({ where: { id }, data: body })
  return NextResponse.json(film)
}

export async function DELETE(_: NextRequest, { params }: Params) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  await prisma.film.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
