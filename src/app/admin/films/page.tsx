import { prisma } from "@/lib/db"
import Link from "next/link"
import ReorderFilms from "./ReorderFilms"

export const dynamic = "force-dynamic"

export default async function AdminFilmsPage() {
  const films = await prisma.film.findMany({ orderBy: { sortOrder: "asc" } })

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
      <ReorderFilms films={films} />
    </div>
  )
}
