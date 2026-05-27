"use client"

import { signOut } from "next-auth/react"

export default function AdminSignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="text-xs text-[#444] hover:text-[#888] transition-colors uppercase tracking-widest"
    >
      Sign Out
    </button>
  )
}
