"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ToggleFilm({ id, active }: { id: string; active: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function toggle() {
    setLoading(true)
    await fetch(`/api/admin/films/${id}/toggle`, { method: "POST" })
    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`w-10 h-5 rounded-full transition-colors relative ${
        active ? "bg-white" : "bg-[#333]"
      } disabled:opacity-50`}
      title={active ? "Deactivate" : "Activate"}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-[#0d0d0d] transition-transform ${
          active ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  )
}
