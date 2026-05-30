"use client"

import { useState } from "react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        window.location.href = "/admin"
      } else {
        setError("Invalid email or password.")
        setLoading(false)
      }
    } catch {
      setError("Connection error. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-10">
          <span className="text-xl font-black uppercase tracking-widest">TRUE</span>
          <span className="text-xl text-[#555]">»</span>
          <span className="text-xl font-black uppercase tracking-widest">FOUND</span>
          <span className="text-xs text-[#555] ml-2 uppercase tracking-widest">Admin</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-[#555] block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#555]"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-[#555] block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#555]"
            />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign In »"}
          </button>
        </form>
      </div>
    </div>
  )
}
