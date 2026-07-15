import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FilmCard from "@/components/FilmCard"
import { prisma } from "@/lib/db"

export const revalidate = 60

export const metadata = {
  title: "All Films | TrueFoundMovies — Stream Bigfoot, Alien & Paranormal Documentaries",
  description: "Browse the full catalog of creature, paranormal and alien found footage films on TrueFoundMovies. Rent or own instantly.",
}

const CATEGORIES = [
  { key: "CRYPTIDS", label: "Creatures" },
  { key: "ALIENS", label: "Aliens" },
  { key: "PARANORMAL", label: "Paranormal" },
]

export default async function FilmsPage() {
  const films = await prisma.film.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  })

  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    films: films.filter((f) => f.category === cat.key),
  })).filter((cat) => cat.films.length > 0)

  return (
    <>
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-[#555] mb-2">
            True Found
          </p>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            The Collection
          </h1>
        </div>

        {grouped.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[#555] uppercase tracking-widest text-sm">
              Films coming soon.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {grouped.map((cat) => (
              <section key={cat.key}>
                <h2 className="text-xs uppercase tracking-[0.3em] text-[#888] mb-6">
                  {cat.label}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {cat.films.map((film) => (
                    <FilmCard key={film.id} {...film} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
