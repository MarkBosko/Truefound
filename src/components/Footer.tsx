import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#222] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black tracking-widest uppercase text-white">
            TRUE
          </span>
          <span className="text-sm text-[#444]">»</span>
          <span className="text-sm font-black tracking-widest uppercase text-white">
            FOUND
          </span>
        </div>
        <p className="text-xs text-[#555]">
          © {new Date().getFullYear()} True Found. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link
            href="/films"
            className="text-xs text-[#555] hover:text-white transition-colors uppercase tracking-widest"
          >
            Films
          </Link>
          <Link
            href="/terms"
            className="text-xs text-[#555] hover:text-white transition-colors uppercase tracking-widest"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
