"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import ToggleFilm from "./ToggleFilm"

type Film = {
  id: string
  title: string
  year: number
  rentalPrice: number
  purchasePrice: number
  active: boolean
  sortOrder: number
}

function fmt(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

export default function ReorderFilms({ films: initial }: { films: Film[] }) {
  const [films, setFilms] = useState(initial)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  async function move(index: number, dir: "up" | "down") {
    const next = [...films]
    const swap = dir === "up" ? index - 1 : index + 1
    ;[next[index], next[swap]] = [next[swap], next[index]]
    const updated = next.map((f, i) => ({ ...f, sortOrder: i }))
    setFilms(updated)
    setSaving(true)
    await fetch("/api/admin/films/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated.map(({ id, sortOrder }) => ({ id, sortOrder }))),
    })
    setSaving(false)
    router.refresh()
  }

  if (films.length === 0)
    return <p className="text-[#555] text-sm p-6">No films yet.</p>

  return (
    <div className="border border-[#1a1a1a] rounded overflow-hidden">
      <table className="w-full text-sm">
        <thead className="border-b border-[#1a1a1a]">
          <tr className="text-xs uppercase tracking-widest text-[#888]">
            <th className="px-4 py-3" />
            <th className="text-left px-4 py-3">Title</th>
            <th className="text-left px-4 py-3">Year</th>
            <th className="text-right px-4 py-3">Rent</th>
            <th className="text-right px-4 py-3">Buy</th>
            <th className="text-center px-4 py-3">Active</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {films.map((film, i) => (
            <tr key={film.id} className="border-b border-[#111] hover:bg-[#111]">
              <td className="px-3 py-4">
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => move(i, "up")}
                    disabled={i === 0 || saving}
                    className="text-[#555] hover:text-white disabled:opacity-20 text-[10px] leading-none"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => move(i, "down")}
                    disabled={i === films.length - 1 || saving}
                    className="text-[#555] hover:text-white disabled:opacity-20 text-[10px] leading-none"
                  >
                    ▼
                  </button>
                </div>
              </td>
              <td className="px-4 py-4 font-medium">{film.title}</td>
              <td className="px-4 py-4 text-[#888]">{film.year}</td>
              <td className="px-4 py-4 text-right text-[#888]">{fmt(film.rentalPrice)}</td>
              <td className="px-4 py-4 text-right text-[#888]">{fmt(film.purchasePrice)}</td>
              <td className="px-4 py-4 text-center">
                <ToggleFilm id={film.id} active={film.active} />
              </td>
              <td className="px-4 py-4 text-right">
                <Link
                  href={`/admin/films/${film.id}`}
                  className="text-xs text-[#888] hover:text-white transition-colors uppercase tracking-widest"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
