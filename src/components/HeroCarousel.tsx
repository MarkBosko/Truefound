"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"

type Film = {
  id: string
  title: string
  slug: string
  description: string
  posterUrl: string
  heroImageUrl: string | null
  rentalPrice: number
  purchasePrice: number
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

export default function HeroCarousel({ films }: { films: Film[] }) {
  const [current, setCurrent] = useState(0)
  const [textVisible, setTextVisible] = useState(true)

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return
      setTextVisible(false)
      setTimeout(() => {
        setCurrent(index)
        setTextVisible(true)
      }, 400)
    },
    [current],
  )

  useEffect(() => {
    if (films.length <= 1) return
    const id = setInterval(() => {
      goTo((current + 1) % films.length)
    }, 7000)
    return () => clearInterval(id)
  }, [current, films.length, goTo])

  const film = films[current]

  return (
    <section className="relative h-[58vh] min-h-[400px] flex items-end overflow-hidden">
      {/* Background layers — all rendered, crossfade with opacity */}
      {films.map((f, i) => (
        <div
          key={f.id}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={f.heroImageUrl ?? f.posterUrl}
            alt=""
            fill
            priority={i === 0}
            className={`object-cover ${f.heroImageUrl ? "object-center" : "object-top"}`}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient — heavier at bottom so text is always readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/55 to-[#0d0d0d]/10 pointer-events-none" />

      {/* Content */}
      <div
        className={`relative max-w-6xl mx-auto px-6 pb-14 w-full transition-opacity duration-400 ${
          textVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="font-display text-xs text-[#888] uppercase tracking-widest mb-2">
          Now Streaming
        </p>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white max-w-2xl leading-none">
          {film.title}
        </h1>
        <p className="text-[#aaa] mt-3 max-w-lg text-sm leading-relaxed line-clamp-2">
          {film.description}
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <Link
            href={`/films/${film.slug}`}
            className="font-display bg-white text-black px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors"
          >
            Trailer / Rent / Buy »
          </Link>
          <Link
            href="/films"
            className="font-display border border-[#555] text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:border-white transition-colors"
          >
            Browse All
          </Link>
        </div>
        <p className="mt-4 text-xs text-[#666]">
          Rent from {formatPrice(film.rentalPrice)}&nbsp;·&nbsp;Own from{" "}
          {formatPrice(film.purchasePrice)}
        </p>

        {/* Dot / pill indicators — only shown when > 1 film */}
        {films.length > 1 && (
          <div className="flex items-center gap-2 mt-7">
            {films.map((f, i) => (
              <button
                key={f.id}
                onClick={() => goTo(i)}
                aria-label={`Go to ${f.title}`}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-8 bg-white"
                    : "w-3 bg-[#555] hover:bg-[#888]"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
