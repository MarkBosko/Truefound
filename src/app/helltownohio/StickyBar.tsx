"use client"

import { useEffect, useState } from "react"

type Props = {
  purchasePrice: string
  href: string
}

export default function StickyBar({ purchasePrice, href }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-t border-[#cc2222]/40 px-6 py-3 flex items-center justify-between gap-4">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-[#888]">June 9 — Complete Collection</p>
        <p className="text-white font-black text-sm uppercase tracking-wide">The film + 10 bonus videos</p>
      </div>
      <a
        href={href}
        className="flex-shrink-0 bg-[#cc2222] text-white px-6 py-3 hover:bg-[#dd3333] transition-colors text-center"
      >
        <div className="font-mono text-xs uppercase tracking-widest mb-0.5">Own It</div>
        <div className="text-lg font-black">{purchasePrice}</div>
      </a>
    </div>
  )
}
