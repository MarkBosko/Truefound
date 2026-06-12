"use client"

import { useEffect, useState } from "react"

type Props = {
  rentalPrice: string
  purchasePrice: string
  href: string
}

export default function StickyBar({ rentalPrice, purchasePrice, href }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past ~500px (below the hero buttons)
      setVisible(window.scrollY > 500)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-[#0a0a08]/95 backdrop-blur border-t border-[#c8a84b]/30 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-white font-black uppercase tracking-wide text-sm">
              Hoax of the Century
            </p>
            <p className="font-mono text-xs text-[#555] uppercase tracking-widest">
              The film they tried to bury · Now streaming
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a
              href={href}
              className="bg-[#c8a84b] text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#dbb85a] transition-colors whitespace-nowrap"
            >
              Rent — {rentalPrice}
            </a>
            <a
              href={href}
              className="border border-[#c8a84b] text-[#c8a84b] px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#c8a84b] hover:text-black transition-colors whitespace-nowrap"
            >
              Own It — {purchasePrice}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
