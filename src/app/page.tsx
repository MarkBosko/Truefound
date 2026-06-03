import Link from "next/link"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FilmCard from "@/components/FilmCard"
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
  const hero = films[0]

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        {hero ? (
          <section className="relative h-[70vh] min-h-[480px] flex items-end">
            <Image
              src={hero.posterUrl}
              alt={hero.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" />
            <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
              <p className="font-display text-xs text-[#888] uppercase tracking-widest mb-2">
                Now Available
              </p>
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white max-w-xl leading-none">
                {hero.title}
              </h1>
              <p className="text-[#aaa] mt-3 max-w-md text-sm leading-relaxed line-clamp-2">
                {hero.description}
              </p>
              <div className="flex gap-4 mt-6">
                <Link
                  href={`/films/${hero.slug}`}
                  className="font-display bg-white text-black px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors"
                >
                  View Film »
                </Link>
                <Link
                  href="/films"
                  className="font-display border border-[#555] text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:border-white transition-colors"
                >
                  Browse All
                </Link>
              </div>
              <p className="mt-4 text-xs text-[#666]">
                Rent from {formatPrice(hero.rentalPrice)} &nbsp;·&nbsp; Own from {formatPrice(hero.purchasePrice)}
              </p>
            </div>
          </section>
        ) : (
          <section className="h-[40vh] flex items-center justify-center border-b border-[#222]">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-4xl font-black tracking-widest uppercase">TRUE</span>
                <span className="text-4xl text-[#555]">»</span>
                <span className="text-4xl font-black tracking-widest uppercase">FOUND</span>
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
