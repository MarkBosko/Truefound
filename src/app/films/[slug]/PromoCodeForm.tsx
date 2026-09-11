"use client"

import { useState } from "react"

type ValidateResult =
  | { type: "SCREENER"; filmId: string | null }
  | { type: "DISCOUNT"; discountCents: number; filmId: string | null }

export default function PromoCodeForm({ filmId, rentalPrice }: { filmId: string; rentalPrice: number }) {
  const [code, setCode]         = useState("")
  const [email, setEmail]       = useState("")
  const [validated, setValidated] = useState<ValidateResult | null>(null)
  const [phase, setPhase]       = useState<"enter" | "screener" | "discount">("enter")
  const [status, setStatus]     = useState<"idle" | "loading" | "done" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleApply(e: React.FormEvent) {
    e.preventDefault()
    if (!code.trim()) return
    setStatus("loading")
    setErrorMsg("")
    const res = await fetch(`/api/validate-promo?code=${encodeURIComponent(code.trim().toUpperCase())}`)
    const data = await res.json()
    if (!res.ok) {
      setStatus("error")
      setErrorMsg(data.error ?? "Invalid code.")
      return
    }
    setValidated(data)
    setStatus("idle")
    if (data.type === "SCREENER") {
      if (data.filmId && data.filmId !== filmId) {
        setStatus("error")
        setErrorMsg("This code is not valid for this film.")
        return
      }
      setPhase("screener")
    } else {
      setPhase("discount")
    }
  }

  async function handleScreenerRedeem(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")
    const res = await fetch("/api/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code.trim().toUpperCase(), email, filmId }),
    })
    const data = await res.json()
    if (res.ok) {
      setStatus("done")
    } else {
      setStatus("error")
      setErrorMsg(data.error ?? "Something went wrong.")
    }
  }

  async function handleDiscountCheckout() {
    setStatus("loading")
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filmId, type: "RENTAL", promoCode: code.trim().toUpperCase() }),
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      setStatus("error")
      setErrorMsg("Checkout failed — please try again.")
    }
  }

  if (status === "done") {
    return (
      <div className="mt-6 border-t border-[#1a1a1a] pt-4">
        <p className="text-xs text-[#4ade80]">Watch link sent — check your email.</p>
      </div>
    )
  }

  const discountedPrice = validated?.type === "DISCOUNT"
    ? ((rentalPrice - validated.discountCents) / 100).toFixed(2)
    : null

  return (
    <div className="mt-6 border-t border-[#1a1a1a] pt-4">
      <p className="text-xs font-bold text-[#f5c800] uppercase tracking-widest mb-3">
        Have a code?
      </p>

      {phase === "enter" && (
        <form onSubmit={handleApply} className="space-y-3">
          <input
            type="text"
            required
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#555] font-mono tracking-widest uppercase"
          />
          {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full border border-[#333] text-[#aaa] text-xs font-bold uppercase tracking-widest py-2 hover:border-[#555] hover:text-white transition-colors disabled:opacity-40"
          >
            {status === "loading" ? "Checking…" : "Apply Code"}
          </button>
        </form>
      )}

      {phase === "screener" && (
        <form onSubmit={handleScreenerRedeem} className="space-y-3">
          <p className="text-xs text-[#4ade80]">Screener code valid — enter your email to watch free.</p>
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#555]"
          />
          {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full border border-[#333] text-[#aaa] text-xs font-bold uppercase tracking-widest py-2 hover:border-[#555] hover:text-white transition-colors disabled:opacity-40"
          >
            {status === "loading" ? "Verifying…" : "Redeem Free Access"}
          </button>
        </form>
      )}

      {phase === "discount" && (
        <div className="space-y-3">
          <p className="text-xs text-[#4ade80]">
            Code applied — ${(validated as { discountCents: number }).discountCents / 100}.00 off your rental.
          </p>
          {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
          <button
            onClick={handleDiscountCheckout}
            disabled={status === "loading"}
            className="w-full border border-[#f5c800] text-[#f5c800] text-xs font-bold uppercase tracking-widest py-2 hover:bg-[#f5c800] hover:text-black transition-colors disabled:opacity-40"
          >
            {status === "loading" ? "Redirecting…" : `Rent for $${discountedPrice} »`}
          </button>
        </div>
      )}
    </div>
  )
}
