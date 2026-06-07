import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#222] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <Image
            src="/TrueFound-logo-transparent.png"
            alt="True Found"
            width={120}
            height={32}
            className="h-7 w-auto"
            style={{ filter: 'brightness(1.35) drop-shadow(0 0 6px rgba(255,255,255,0.9)) drop-shadow(0 0 16px rgba(255,255,255,0.45))' }}
          />
        </div>
        <p className="text-xs text-[#555]">
          © {new Date().getFullYear()} True Found. All rights reserved.
        </p>
        <div className="flex gap-6">
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
        </div>
      </div>
    </footer>
  )
}
