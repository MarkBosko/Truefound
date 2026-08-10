"use client"

import { useState } from "react"

type Film = { id: string; title: string }

export default function GenerateCodeForm({ films }: { films: Film[] }) {
  const [filmId, setFilmId] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ code: string; film: { title: string } } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    const res = await fetch("/api/admin/promo-codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filmId }),
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) {
      setResult(data)
      setFilmId("")
    }
  }

  return (
    <div className="border border-[#222] bg-[#111] rounded p-6 mb-8">
      <h2 className="text-xs uppercase tracking-[0.3em] text-[#888] mb-4">Generate New Code</h2>
      <form onSubmit={handleSubmit} className="flex gap-3 items-end">
        <div className="flex-1">
          <label className="text-xs text-[#666] uppercase tracking-widest block mb-1">Film</label>
          <select
            required
            value={filmId}
            onChange={(e) => setFilmId(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#555]"
          >
            <option value="">Select a film…</option>
            {films.map((f) => (
              <option key={f.id} value={f.id}>{f.title}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading || !filmId}
          className="bg-white text-black px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors disabled:opacity-40"
        >
          {loading ? "…" : "Generate"}
        </button>
      </form>

      {result && (
        <div className="mt-4 border border-[#2a2a2a] rounded px-4 py-3 flex items-center gap-4">
          <span className="font-mono text-lg font-bold tracking-widest text-white">{result.code}</span>
          <span className="text-xs text-[#666]">{result.film.title} · expires in 15 days</span>
          <button
            onClick={() => navigator.clipboard.writeText(result.code)}
            className="ml-auto text-xs text-[#666] hover:text-white transition-colors uppercase tracking-widest"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  )
}
