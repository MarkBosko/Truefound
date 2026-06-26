"use client"

import { useRef, useState, useEffect } from "react"

export default function ScrollRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [canScrollRight, setCanScrollRight] = useState(false)

  function checkScroll() {
    const el = ref.current
    if (!el) return
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  useEffect(() => {
    checkScroll()
    const el = ref.current
    el?.addEventListener("scroll", checkScroll, { passive: true })
    window.addEventListener("resize", checkScroll)
    return () => {
      el?.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  function scrollRight() {
    ref.current?.scrollBy({ left: 320, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6"
      >
        {children}
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent" />
      {canScrollRight && (
        <button
          onClick={scrollRight}
          aria-label="Scroll right"
          className="absolute right-2 top-[40%] -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center text-xl leading-none"
        >
          ›
        </button>
      )}
    </div>
  )
}
