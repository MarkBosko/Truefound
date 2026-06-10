import Link from "next/link"
import Image from "next/image"

const USFlag = () => (
  <svg width="26" height="16" viewBox="0 0 26 16" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 rounded-sm">
    {/* Red background */}
    <rect width="26" height="16" fill="#B22234"/>
    {/* White stripes */}
    {[1,3,5,7,9,11].map((i) => (
      <rect key={i} y={i * 16/13} width="26" height={16/13} fill="white"/>
    ))}
    {/* Blue canton */}
    <rect width="11" height={7 * 16/13} fill="#3C3B6E"/>
    {/* Stars - simplified dots */}
    {[0,1,2,3,4].map((row) =>
      [0,1,2,3,4,5].map((col) => (
        col < (row % 2 === 0 ? 6 : 5) && (
          <circle
            key={`${row}-${col}`}
            cx={0.9 + col * 1.7 + (row % 2 === 0 ? 0 : 0.85)}
            cy={0.9 + row * 1.4}
            r="0.38"
            fill="white"
          />
        )
      ))
    )}
  </svg>
)

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#222] pt-12 pb-8 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">

          {/* Logo + about */}
          <div className="flex flex-col gap-5">
            <div className="w-fit">
              <Image
                src="/TrueFound-logo-transparent.png"
                alt="True Found"
                width={180}
                height={48}
                className="h-10 w-auto"
                style={{ filter: 'brightness(1.5) drop-shadow(0 0 8px rgba(255,255,255,1)) drop-shadow(0 0 20px rgba(255,255,255,0.5))' }}
              />
            </div>
            <div className="flex items-start gap-2.5">
              <USFlag />
              <p className="text-xs text-[#777] leading-relaxed">
                True Found is a U.S. founded and based company that licenses films
                directly from independent filmmakers.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-[#888] mb-1">
              Customer Support
            </p>
            <p className="text-xs text-[#777]">James &ldquo;Johnny&rdquo; Sinclair</p>
            <a
              href="mailto:johnny@truefoundmovies.com"
              className="text-xs text-[#777] hover:text-white transition-colors"
            >
              johnny@truefoundmovies.com
            </a>
          </div>

          {/* Trust + nav */}
          <div className="flex flex-col gap-3">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-[#888] mb-1">
              Secure Checkout
            </p>
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#777] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-[#777]">Payments secured by Stripe</span>
            </div>
            <p className="text-xs text-[#555] leading-relaxed">
              Your payment information is never stored on our servers.
            </p>
            <div className="flex gap-5 mt-2">
              <Link href="/films" className="font-display text-xs text-[#666] hover:text-white transition-colors uppercase tracking-widest">
                Films
              </Link>
              <Link href="/terms" className="font-display text-xs text-[#666] hover:text-white transition-colors uppercase tracking-widest">
                Terms
              </Link>
              <Link href="/about" className="font-display text-xs text-[#666] hover:text-white transition-colors uppercase tracking-widest">
                About
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1a1a1a] pt-6">
          <p className="text-xs text-[#444] text-center">
            © {new Date().getFullYear()} True Found. All rights reserved.&nbsp;·&nbsp;All films licensed for digital distribution.
          </p>
        </div>

      </div>
    </footer>
  )
}
