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

export async function proxy(req: NextRequest) {
  const hostname = req.headers.get("host") || ""
  const pathname = req.nextUrl.pathname

  // Route bigfoothoax.com to the dedicated landing page
  if (
    hostname.includes("bigfoothoax.com") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next")
  ) {
    return NextResponse.rewrite(new URL("/bigfoothoax", req.url))
  }

  // Route helltownohio.com to the June 9 landing page
  if (
    hostname.includes("helltownohio.com") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next")
  ) {
    return NextResponse.rewrite(new URL("/helltownohio", req.url))
  }

  // Admin auth guard
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login"
    const valid = await isValidToken(req)

    if (!valid && !isLoginPage) {
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }

    if (valid && isLoginPage) {
      return NextResponse.redirect(new URL("/admin", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)", "/admin/:path*"],
}
