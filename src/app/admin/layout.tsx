import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import AdminSignOut from "./AdminSignOut"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/admin/login")

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-52 border-r border-[#1a1a1a] flex flex-col py-8 px-5 shrink-0">
        <Link href="/admin" className="flex items-center gap-1.5 mb-10">
          <span className="text-sm font-black uppercase tracking-widest">TRUE</span>
          <span className="text-sm text-[#444]">»</span>
          <span className="text-sm font-black uppercase tracking-widest">FOUND</span>
        </Link>
        <nav className="flex flex-col gap-1 flex-1">
          {[
            { href: "/admin", label: "Dashboard" },
            { href: "/admin/films", label: "Films" },
            { href: "/admin/orders", label: "Orders" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs uppercase tracking-widest text-[#666] hover:text-white px-3 py-2 hover:bg-[#161616] rounded transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <Link
            href="/"
            className="text-xs text-[#444] hover:text-[#888] transition-colors block mb-3 uppercase tracking-widest"
          >
            ← View Site
          </Link>
          <AdminSignOut />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-10">{children}</main>
    </div>
  )
}
