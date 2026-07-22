"use client"

import { useState } from "react"

type Video = { title: string; vhxId: string }

type Props = {
  videos: Video[]
  filmTitle: string
  director: string
  year: number
  expiryMsg: string
}

export default function BundlePlayer({ videos, filmTitle, director, year, expiryMsg }: Props) {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = videos[activeIdx]

  return (
    <div className="flex flex-col lg:flex-row flex-1 min-h-0">
      {/* Player */}
      <div className="flex-1 flex flex-col bg-black">
        <div className="flex-1 flex items-center">
          <div className="w-full aspect-video">
            <iframe
              key={active.vhxId}
              src={`https://embed.vhx.tv/videos/${active.vhxId}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div className="border-t border-[#222] px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-bold uppercase tracking-wider">
              {filmTitle} — {active.title}
            </h1>
            <p className="text-xs text-[#666] mt-0.5">
              {director} · {year}
            </p>
          </div>
          <p className="text-xs text-[#555] uppercase tracking-widest">{expiryMsg}</p>
        </div>
      </div>

      {/* Video list sidebar */}
      <div className="lg:w-72 border-t lg:border-t-0 lg:border-l border-[#222] flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-[#222]">
          <p className="font-mono text-xs uppercase tracking-widest text-[#555]">Complete Collection</p>
          <p className="text-xs text-[#888] mt-0.5">{videos.length} videos</p>
        </div>
        <div className="overflow-y-auto flex-1">
          {videos.map((v, i) => (
            <button
              key={v.vhxId}
              onClick={() => setActiveIdx(i)}
              className={`w-full text-left px-4 py-4 border-b border-[#1a1a1a] flex items-start gap-3 transition-colors ${
                i === activeIdx
                  ? "bg-[#1a1a1a] text-white"
                  : "text-[#888] hover:bg-[#111] hover:text-white"
              }`}
            >
              <span className="font-mono text-xs text-[#444] mt-0.5 flex-shrink-0 w-4">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold uppercase tracking-wide truncate ${i === activeIdx ? "text-white" : ""}`}>
                  {v.title}
                </p>
                {i === activeIdx && (
                  <p className="font-mono text-xs text-[#cc2222] uppercase tracking-widest mt-1">▶ Now Playing</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
