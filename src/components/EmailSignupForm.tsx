"use client"

import { useState } from "react"

export default function EmailSignupForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? "done" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "done") {
    return (
      <p className="text-sm text-[#aaa]">
        You&apos;re on the list. We&apos;ll let you know when new films drop.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#555]"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-white text-black text-xs font-bold uppercase tracking-widest px-4 py-2 rounded hover:bg-[#ddd] transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "…" : "Notify Me"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-400 mt-1 absolute">Something went wrong. Try again.</p>
      )}
    </form>
  )
}
