import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FilmCard from "@/components/FilmCard"
import { prisma } from "@/lib/db"

export const revalidate = 60

export const metadata = {
  title: "Films — True Found",
  description: "Browse the full collection of independent films.",
}

export default async function FilmsPage() {
  const films = await prisma.film.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <>
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[#555] mb-2">
            True Found
          </p>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            The Collection
          </h1>
        </div>

        {films.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[#555] uppercase tracking-widest text-sm">
              Films coming soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {films.map((film) => (
              <FilmCard key={film.id} {...film} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
