import { prisma } from "@/lib/db"
import { formatPrice } from "@/lib/stripe"
import Link from "next/link"
import ToggleFilm from "./ToggleFilm"

export const dynamic = "force-dynamic"

export default async function AdminFilmsPage() {
  const films = await prisma.film.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-black uppercase tracking-widest">Films</h1>
        <Link
          href="/admin/films/new"
          className="bg-white text-black px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors"
        >
          + Add Film
        </Link>
      </div>

      <div className="border border-[#1a1a1a] rounded overflow-hidden">
        {films.length === 0 ? (
          <p className="text-[#555] text-sm p-6">No films yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-[#1a1a1a]">
              <tr className="text-xs uppercase tracking-widest text-[#888]">
                <th className="text-left px-6 py-3">Title</th>
                <th className="text-left px-6 py-3">Year</th>
                <th className="text-right px-6 py-3">Rent</th>
                <th className="text-right px-6 py-3">Buy</th>
                <th className="text-center px-6 py-3">Active</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {films.map((film) => (
                <tr key={film.id} className="border-b border-[#111] hover:bg-[#111]">
                  <td className="px-6 py-4 font-medium">{film.title}</td>
                  <td className="px-6 py-4 text-[#888]">{film.year}</td>
                  <td className="px-6 py-4 text-right text-[#888]">{formatPrice(film.rentalPrice)}</td>
                  <td className="px-6 py-4 text-right text-[#888]">{formatPrice(film.purchasePrice)}</td>
                  <td className="px-6 py-4 text-center">
                    <ToggleFilm id={film.id} active={film.active} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/films/${film.id}`}
                      className="text-xs text-[#888] hover:text-white transition-colors uppercase tracking-widest"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
