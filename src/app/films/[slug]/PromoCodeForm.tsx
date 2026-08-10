"use client"

import { useState } from "react"

export default function PromoCodeForm({ filmId }: { filmId: string }) {
  const [code, setCode] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
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

  if (status === "done") {
    return (
      <div className="mt-6 border-t border-[#1a1a1a] pt-4">
        <p className="text-xs text-[#4ade80]">Watch link sent — check your email.</p>
      </div>
    )
  }

  return (
    <div className="mt-6 border-t border-[#1a1a1a] pt-4">
      <p className="text-xs font-bold text-[#f5c800] uppercase tracking-widest mb-3">
        Have a screener code?
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#555]"
        />
        <input
          type="text"
          required
          placeholder="Screener code"
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
          {status === "loading" ? "Verifying…" : "Redeem Code"}
        </button>
      </form>
    </div>
  )
}
