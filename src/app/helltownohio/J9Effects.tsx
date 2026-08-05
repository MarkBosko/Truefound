"use client"

import { useEffect } from "react"

export default function J9Effects() {
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    // Scroll reveal
    const targets = document.querySelectorAll<HTMLElement>(".j9-reveal")
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("j9-in"))
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("j9-in")
              io.unobserve(e.target)
            }
          })
        },
        { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
      )
      targets.forEach((t) => io.observe(t))
      return () => io.disconnect()
    }
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    const cvs = document.getElementById("j9-grain") as HTMLCanvasElement | null
    if (!cvs || reduce) return

    const ctx = cvs.getContext("2d")!
    function resize() {
      cvs!.width = Math.floor(window.innerWidth / 2)
      cvs!.height = Math.floor(window.innerHeight / 2)
    }
    resize()
    window.addEventListener("resize", resize)

    function draw() {
      const w = cvs!.width
      const h = cvs!.height
      const img = ctx.createImageData(w, h)
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0
        d[i] = d[i + 1] = d[i + 2] = v
        d[i + 3] = 255
      }
      ctx.putImageData(img, 0, 0)
    }
    draw()
    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return null
}
