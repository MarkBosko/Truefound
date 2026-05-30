import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const secret = () => new TextEncoder().encode(process.env.NEXTAUTH_SECRET!)

async function isValidToken(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("admin-token")?.value
  if (!token) return false
  try {
    await jwtVerify(token, await secret())
    return true
  } catch {
    return false
  }
}

export async function middleware(req: NextRequest) {
  const isLoginPage = req.nextUrl.pathname === "/admin/login"
  const valid = await isValidToken(req)

  if (!valid && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  if (valid && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
