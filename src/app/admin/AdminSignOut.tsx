"use client"

export default function AdminSignOut() {
  async function handleSignOut() {
    await fetch("/api/admin/auth/logout", { method: "POST" })
    window.location.href = "/admin/login"
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-xs text-[#444] hover:text-[#888] transition-colors uppercase tracking-widest"
    >
      Sign Out
    </button>
  )
}
