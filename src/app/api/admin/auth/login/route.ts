import { NextRequest, NextResponse } from "next/server"
import { createAdminToken } from "@/lib/admin-auth"

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const token = await createAdminToken()

  const res = NextResponse.json({ ok: true })
  res.cookies.set("admin-token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  return res
}
