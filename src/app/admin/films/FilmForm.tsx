"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type Film = {
  id?: string
  title?: string
  slug?: string
  description?: string
  director?: string
  year?: number
  category?: string
  runtime?: number
  vimeoTrailerId?: string
  vimeoFilmId?: string
  posterUrl?: string
  heroImageUrl?: string | null
  rentalPrice?: number
  purchasePrice?: number
}

export default function FilmForm({ film }: { film?: Film }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError("")

    const data = Object.fromEntries(new FormData(e.currentTarget))
    const payload = {
      ...data,
      year: Number(data.year),
      runtime: Number(data.runtime),
      rentalPrice: Math.round(Number(data.rentalPrice) * 100),
      purchasePrice: Math.round(Number(data.purchasePrice) * 100),
    }

    const url = film?.id ? `/api/admin/films/${film.id}` : "/api/admin/films"
    const method = film?.id ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push("/admin/films")
      router.refresh()
    } else {
      const { error: msg } = await res.json()
      setError(msg || "Something went wrong.")
      setSaving(false)
    }
  }

  const field = (
    name: string,
    label: string,
    opts: { type?: string; required?: boolean; placeholder?: string; defaultValue?: string | number } = {}
  ) => (
    <div key={name}>
      <label className="text-xs uppercase tracking-widest text-[#aaa] block mb-2">
        {label}
      </label>
      <input
        name={name}
        type={opts.type ?? "text"}
        required={opts.required ?? true}
        placeholder={opts.placeholder}
        defaultValue={opts.defaultValue}
        step={opts.type === "number" ? "0.01" : undefined}
        className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#555]"
      />
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {field("title", "Title", { defaultValue: film?.title })}

      <div>
        <label className="text-xs uppercase tracking-widest text-[#aaa] block mb-2">
          Description
        </label>
        <textarea
          name="description"
          required
          defaultValue={film?.description}
          rows={4}
          className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#555] resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {field("director", "Director", { defaultValue: film?.director })}
        <div>
          <label className="text-xs uppercase tracking-widest text-[#aaa] block mb-2">
            Category
          </label>
          <select
            name="category"
            defaultValue={film?.category ?? "CRYPTIDS"}
            className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#555]"
          >
            <option value="CRYPTIDS">Cryptids</option>
            <option value="ALIENS">Aliens</option>
            <option value="PARANORMAL">Paranormal</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {field("year", "Year", { type: "number", defaultValue: film?.year })}
        {field("runtime", "Runtime (min)", { type: "number", defaultValue: film?.runtime })}
      </div>

      {field("posterUrl", "Poster Image URL", { defaultValue: film?.posterUrl, placeholder: "https://... (portrait, used in film cards)" })}
      {field("heroImageUrl", "Hero Image URL", { required: false, defaultValue: film?.heroImageUrl ?? "", placeholder: "https://... (landscape, used in homepage hero — optional)" })}

      <div className="grid grid-cols-2 gap-4">
        {field("vimeoTrailerId", "Vimeo Trailer ID", { defaultValue: film?.vimeoTrailerId, placeholder: "e.g. 123456789" })}
        {field("vimeoFilmId", "Vimeo Film ID", { defaultValue: film?.vimeoFilmId, placeholder: "e.g. 987654321" })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {field("rentalPrice", "Rental Price ($)", {
          type: "number",
          defaultValue: film?.rentalPrice ? film.rentalPrice / 100 : undefined,
          placeholder: "e.g. 2.99",
        })}
        {field("purchasePrice", "Purchase Price ($)", {
          type: "number",
          defaultValue: film?.purchasePrice ? film.purchasePrice / 100 : undefined,
          placeholder: "e.g. 4.99",
        })}
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : film?.id ? "Save Changes" : "Add Film"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-xs text-[#555] hover:text-white transition-colors uppercase tracking-widest"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
