import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FilmCard from "@/components/FilmCard"
import HeroCarousel from "@/components/HeroCarousel"
import ScrollRow from "@/components/ScrollRow"
import { prisma } from "@/lib/db"

export const revalidate = 60

async function getFeaturedFilms() {
  return prisma.film.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
    take: 8,
  })
}

async function getFilmsByCategory() {
  const [cryptids, aliens, paranormal] = await Promise.all([
    prisma.film.findMany({ where: { active: true, category: "CRYPTIDS" }, orderBy: { sortOrder: "asc" } }),
    prisma.film.findMany({ where: { active: true, category: "ALIENS" }, orderBy: { sortOrder: "asc" } }),
    prisma.film.findMany({ where: { active: true, category: "PARANORMAL" }, orderBy: { sortOrder: "asc" } }),
  ])
  return { cryptids, aliens, paranormal }
}

export default async function HomePage() {
  const [films, categories] = await Promise.all([getFeaturedFilms(), getFilmsByCategory()])

  return (
    <>
      <Header />
      <main className="flex-1">
        <h1 className="sr-only">
          Stream Bigfoot, Alien and Paranormal Found Footage Films — TrueFoundMovies
        </h1>
        {/* Hero */}
        {films.length > 0 ? (
          <HeroCarousel films={films} />
        ) : (
          <section className="h-[40vh] flex items-center justify-center border-b border-[#222]">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="font-display text-4xl font-black tracking-widest uppercase">True Found</span>
              </div>
              <p className="text-[#666] text-sm uppercase tracking-widest">
                Stream creature, paranormal and alien found footage films.
              </p>
            </div>
          </section>
        )}

        {/* Category rows */}
        {(() => {
          const rows = [
            { key: "CRYPTIDS", label: "Creatures", films: categories.cryptids },
            { key: "ALIENS",   label: "Aliens",    films: categories.aliens },
            { key: "PARANORMAL", label: "Paranormal", films: categories.paranormal },
          ].filter((r) => r.films.length > 0)

          return rows.length > 0 ? (
            <div className="py-6 space-y-8">
              {rows.map((cat) => (
                <section key={cat.key} className="px-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xs uppercase tracking-[0.3em] text-[#888]">
                      {cat.label}
                    </h2>
                    <Link
                      href="/films"
                      className="font-display text-xs uppercase tracking-widest text-[#555] hover:text-white transition-colors"
                    >
                      See All »
                    </Link>
                  </div>
                  <ScrollRow>
                    {cat.films.map((film) => (
                      <div key={film.id} className="flex-none w-36 sm:w-44">
                        <FilmCard {...film} />
                      </div>
                    ))}
                  </ScrollRow>
                </section>
              ))}
            </div>
          ) : null
        })()}
      </main>
      <Footer />
    </>
  )
}
