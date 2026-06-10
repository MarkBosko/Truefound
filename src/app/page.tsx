import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FilmCard from "@/components/FilmCard"
import HeroCarousel from "@/components/HeroCarousel"
import { prisma } from "@/lib/db"

export const revalidate = 60

async function getFeaturedFilms() {
  return prisma.film.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  })
}

export default async function HomePage() {
  const films = await getFeaturedFilms()

  return (
    <>
      <Header />
      <main className="flex-1">
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
                Independent films, handpicked.
              </p>
            </div>
          </section>
        )}

        {/* Category rows */}
        {films.length > 0 && (() => {
          const CATEGORIES = [
            { key: "CRYPTIDS", label: "Creatures" },
            { key: "ALIENS", label: "Aliens" },
            { key: "PARANORMAL", label: "Paranormal" },
          ]
          const grouped = CATEGORIES.map((cat) => ({
            ...cat,
            films: films.filter((f) => f.category === cat.key),
          })).filter((cat) => cat.films.length > 0)

          return (
            <div className="py-6 space-y-8">
              {grouped.map((cat) => (
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
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6">
                    {cat.films.map((film) => (
                      <div key={film.id} className="flex-none w-36 sm:w-44">
                        <FilmCard {...film} />
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )
        })()}
      </main>
      <Footer />
    </>
  )
}
