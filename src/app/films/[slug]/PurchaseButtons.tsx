"use client"

import { useState } from "react"

type Props = {
  filmId: string
  type: "RENTAL" | "PURCHASE"
  label: string
  price: number
}

export default function PurchaseButtons({ filmId, type, label, price }: Props) {
  const [loading, setLoading] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
  const [email, setEmail] = useState("")
  const isFree = price === 0

  async function handlePaidCheckout() {
    setLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filmId, type }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } finally {
      setLoading(false)
    }
  }

  async function handleFreeCheckout(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filmId, type, email }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } finally {
      setLoading(false)
    }
  }

  if (isFree && showEmail) {
    return (
      <form onSubmit={handleFreeCheckout} className="flex flex-col gap-2">
        <input
          type="email"
          required
          autoFocus
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#1a1a1a] border border-[#333] text-white px-3 py-2 text-sm focus:outline-none focus:border-[#777] placeholder:text-[#555]"
        />
        <button
          type="submit"
          disabled={loading}
          className="font-display w-full bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Loading…" : "Watch Free →"}
        </button>
      </form>
    )
  }

  return (
    <button
      onClick={isFree ? () => setShowEmail(true) : handlePaidCheckout}
      disabled={loading}
      className="font-display w-full bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Loading…" : isFree ? "Watch Free" : label}
    </button>
  )
}
