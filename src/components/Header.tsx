import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="border-b border-[#222] bg-[#0d0d0d] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/TrueFound-logo-transparent.png"
            alt="True Found"
            width={180}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/films"
            className="text-sm tracking-widest uppercase text-[#888] hover:text-white transition-colors"
          >
            Films
          </Link>
        </nav>
      </div>
    </header>
  )
}
