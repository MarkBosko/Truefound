import { prisma } from "@/lib/db"
import { formatPrice } from "@/lib/stripe"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
  const [filmCount, orders] = await Promise.all([
    prisma.film.count({ where: { active: true } }),
    prisma.order.findMany({ include: { film: true }, orderBy: { createdAt: "desc" } }),
  ])

  const totalRevenue = orders.reduce((sum, o) => sum + o.amountCents, 0)
  const revenueByFilm = orders.reduce<Record<string, { title: string; total: number; count: number }>>(
    (acc, o) => {
      if (!acc[o.filmId]) acc[o.filmId] = { title: o.film.title, total: 0, count: 0 }
      acc[o.filmId].total += o.amountCents
      acc[o.filmId].count += 1
      return acc
    },
    {}
  )

  return (
    <div>
      <h1 className="text-xl font-black uppercase tracking-widest mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        {[
          { label: "Active Films", value: filmCount },
          { label: "Total Orders", value: orders.length },
          { label: "Total Revenue", value: formatPrice(totalRevenue) },
        ].map(({ label, value }) => (
          <div key={label} className="border border-[#1a1a1a] bg-[#111] rounded p-6">
            <p className="text-xs uppercase tracking-widest text-[#555] mb-2">{label}</p>
            <p className="text-2xl font-black">{value}</p>
          </div>
        ))}
      </div>

      {/* Revenue by film */}
      <div className="mb-8">
        <h2 className="text-xs uppercase tracking-[0.3em] text-[#555] mb-4">
          Revenue by Film
        </h2>
        <div className="border border-[#1a1a1a] rounded overflow-hidden">
          {Object.entries(revenueByFilm).length === 0 ? (
            <p className="text-[#555] text-sm p-6">No orders yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-[#1a1a1a]">
                <tr className="text-xs uppercase tracking-widest text-[#555]">
                  <th className="text-left px-6 py-3">Film</th>
                  <th className="text-right px-6 py-3">Orders</th>
                  <th className="text-right px-6 py-3">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(revenueByFilm)
                  .sort((a, b) => b.total - a.total)
                  .map(({ title, total, count }) => (
                    <tr key={title} className="border-b border-[#111] hover:bg-[#111]">
                      <td className="px-6 py-4">{title}</td>
                      <td className="px-6 py-4 text-right text-[#888]">{count}</td>
                      <td className="px-6 py-4 text-right font-bold">{formatPrice(total)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Link
        href="/admin/films/new"
        className="inline-block bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors"
      >
        + Add Film
      </Link>
    </div>
  )
}
