import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

type Params = { params: Promise<{ id: string }> }

export async function POST(_: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const film = await prisma.film.findUnique({ where: { id } })
  if (!film) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const updated = await prisma.film.update({
    where: { id },
    data: { active: !film.active },
  })
  return NextResponse.json(updated)
}
