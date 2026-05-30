import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"

const secret = () => new TextEncoder().encode(process.env.NEXTAUTH_SECRET!)

export async function createAdminToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(await secret())
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin-token")?.value
  if (!token) return false
  try {
    await jwtVerify(token, await secret())
    return true
  } catch {
    return false
  }
}
