import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#222] pt-12 pb-8 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">

          {/* Logo + about */}
          <div className="flex flex-col gap-4">
            <Image
              src="/TrueFound-logo-transparent.png"
              alt="True Found"
              width={120}
              height={32}
              className="h-7 w-auto"
              style={{ filter: 'brightness(1.35) drop-shadow(0 0 6px rgba(255,255,255,0.9)) drop-shadow(0 0 16px rgba(255,255,255,0.45))' }}
            />
            <p className="text-xs text-[#666] leading-relaxed">
              <span className="mr-1">🇺🇸</span>
              True Found is a U.S. founded and based company that licenses films
              directly from independent filmmakers.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-[#888] mb-1">
              Customer Support
            </p>
            <a
              href="mailto:customer@truefoundmovies.com"
              className="text-xs text-[#666] hover:text-white transition-colors"
            >
              customer@truefoundmovies.com
            </a>
            <a
              href="tel:+10000000000"
              className="text-xs text-[#666] hover:text-white transition-colors"
            >
              1-800-XXX-XXXX
            </a>
            <p className="text-xs text-[#444] mt-1">
              Mon–Fri, 9am–6pm ET
            </p>
          </div>

          {/* Trust + nav */}
          <div className="flex flex-col gap-3">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-[#888] mb-1">
              Secure Checkout
            </p>
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#666]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-[#666]">Payments secured by Stripe</span>
            </div>
            <p className="text-xs text-[#444] leading-relaxed">
              Your payment information is never stored on our servers.
            </p>
            <div className="flex gap-5 mt-2">
              <Link
                href="/films"
                className="font-display text-xs text-[#555] hover:text-white transition-colors uppercase tracking-widest"
              >
                Films
              </Link>
              <Link
                href="/terms"
                className="font-display text-xs text-[#555] hover:text-white transition-colors uppercase tracking-widest"
              >
                Terms
              </Link>
              <Link
                href="/about"
                className="font-display text-xs text-[#555] hover:text-white transition-colors uppercase tracking-widest"
              >
                About
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1a1a1a] pt-6">
          <p className="text-xs text-[#444] text-center">
            © {new Date().getFullYear()} True Found. All rights reserved. &nbsp;·&nbsp; All films licensed for digital distribution.
          </p>
        </div>

      </div>
    </footer>
  )
}
