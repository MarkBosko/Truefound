import Link from "next/link"

export default function Header() {
  return (
    <header className="border-b border-[#222] bg-[#0d0d0d] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-widest uppercase text-white">
            TRUE
          </span>
          <span className="text-2xl text-[#666] group-hover:text-white transition-colors">
            »
          </span>
          <span className="text-2xl font-black tracking-widest uppercase text-white">
            FOUND
          </span>
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
