import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const slug = slugify(body.title)

  try {
    const film = await prisma.film.create({
      data: { ...body, slug },
    })
    return NextResponse.json(film)
  } catch {
    return NextResponse.json({ error: "Slug already exists or invalid data." }, { status: 400 })
  }
}
