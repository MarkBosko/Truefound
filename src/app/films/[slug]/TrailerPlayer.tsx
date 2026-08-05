"use client"

import { useEffect, useRef, useState } from "react"
import PurchaseButtons from "./PurchaseButtons"

type Props = {
  filmId: string
  vimeoTrailerId: string
  title: string
  rentalLabel: string
  purchaseLabel: string
}

export default function TrailerPlayer({ filmId, vimeoTrailerId, title, rentalLabel, purchaseLabel }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [showCTA, setShowCTA] = useState(false)

  useEffect(() => {
    // Primary: postMessage API (works if VHX supports it)
    function send(method: string, value: string) {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ method, value }), "*"
      )
    }
    function onMessage(e: MessageEvent) {
      let data = e.data
      if (typeof data === "string") {
        try { data = JSON.parse(data) } catch { return }
      }
      if (!data?.event) return
      if (data.event === "ready") {
        send("addEventListener", "finish")
        send("addEventListener", "timeupdate")
      }
      if (data.event === "finish") setShowCTA(true)
      if (data.event === "timeupdate" && (data.data?.percent ?? 0) >= 0.97) setShowCTA(true)
    }
    window.addEventListener("message", onMessage)

    // Fallback: count visible seconds — shows CTA at 2 minutes
    const TARGET = 120
    let elapsed = 0
    const interval = setInterval(() => {
      if (!document.hidden) {
        elapsed += 1
        if (elapsed >= TARGET) setShowCTA(true)
      }
    }, 1000)

    return () => {
      window.removeEventListener("message", onMessage)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="relative bg-black aspect-video max-h-[60vh] overflow-hidden">
      <iframe
        ref={iframeRef}
        src={`https://embed.vhx.tv/videos/${vimeoTrailerId}?autoplay=1&muted=1&api=1`}
        className="w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />

      {showCTA && (
        <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center gap-5 p-6 animate-in fade-in duration-500">
          <p className="text-[#666] text-[10px] uppercase tracking-[0.3em]">{title}</p>
          <h2 className="text-white font-black uppercase text-2xl sm:text-3xl tracking-tight text-center">
            Ready to watch?
          </h2>
          <div className="flex gap-3 mt-1">
            <div className="w-36 sm:w-44">
              <PurchaseButtons filmId={filmId} type="RENTAL" label={rentalLabel} />
            </div>
            <div className="w-36 sm:w-44">
              <PurchaseButtons filmId={filmId} type="PURCHASE" label={purchaseLabel} />
            </div>
          </div>
          <button
            onClick={() => setShowCTA(false)}
            className="text-[11px] text-[#444] hover:text-[#888] uppercase tracking-widest transition-colors mt-1"
          >
            Watch again
          </button>
        </div>
      )}
    </div>
  )
}
