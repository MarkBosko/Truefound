import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FilmCard from "@/components/FilmCard"
import HeroCarousel from "@/components/HeroCarousel"
import { prisma } from "@/lib/db"
import { formatPrice } from "@/lib/stripe"

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

        {/* Film grid */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#888]">
              The Collection
            </h2>
            {films.length > 4 && (
              <Link
                href="/films"
                className="text-xs uppercase tracking-widest text-[#555] hover:text-white transition-colors"
              >
                See All »
              </Link>
            )}
          </div>
          {films.length === 0 ? (
            <p className="text-[#555] text-sm">Films coming soon.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {films.map((film) => (
                <FilmCard key={film.id} {...film} />
              ))}
            </div>
          )}
        </section>

        {/* Value prop strip */}
        <section className="border-t border-[#222] py-14 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            {[
              { label: "Rent", desc: "48-hour access from $1.99" },
              { label: "Own", desc: "Permanent access from $4.99" },
              { label: "Stream", desc: "No downloads. Watch anywhere." },
            ].map(({ label, desc }) => (
              <div key={label}>
                <p className="font-display text-xs uppercase tracking-[0.3em] text-[#555] mb-2">{label}</p>
                <p className="text-sm text-[#888]">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
