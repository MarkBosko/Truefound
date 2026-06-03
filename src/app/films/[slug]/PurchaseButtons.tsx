"use client"

import { useState } from "react"

type Props = {
  filmId: string
  type: "RENTAL" | "PURCHASE"
  label: string
}

export default function PurchaseButtons({ filmId, type, label }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filmId, type }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="font-display w-full bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Loading…" : label}
    </button>
  )
}
