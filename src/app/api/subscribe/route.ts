import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { sendSubscriberWelcomeEmail } from "@/lib/email"

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 })
  }

  try {
    await prisma.subscriber.create({ data: { email } })
    await sendSubscriberWelcomeEmail(email)
  } catch (err: unknown) {
    // P2002 = unique constraint — already subscribed, no email needed
    if ((err as { code?: string }).code !== "P2002") throw err
  }

  return NextResponse.json({ ok: true })
}
