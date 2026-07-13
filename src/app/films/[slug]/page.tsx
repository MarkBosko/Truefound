import { notFound } from "next/navigation"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { prisma } from "@/lib/db"
import { formatPrice } from "@/lib/stripe"
import PurchaseButtons from "./PurchaseButtons"

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

const CATEGORY_KEYWORDS: Record<string, string> = {
  CRYPTIDS:   "bigfoot, cryptid, creature, found footage, monster, documentary",
  ALIENS:     "alien, UFO, extraterrestrial, found footage, alien encounter, documentary",
  PARANORMAL: "paranormal, ghost, supernatural, found footage, horror documentary",
}

const CATEGORY_GENRE: Record<string, string> = {
  CRYPTIDS:   "Documentary, Horror",
  ALIENS:     "Documentary, Science Fiction",
  PARANORMAL: "Documentary, Horror",
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const film = await prisma.film.findUnique({ where: { slug, active: true } })
  if (!film) return {}

  const keywords = CATEGORY_KEYWORDS[film.category] ?? "independent film, documentary, found footage"
  const description = `${film.description} Stream, rent, or own ${film.title} on TrueFoundMovies.`

  return {
    title: `${film.title} | Stream on TrueFoundMovies`,
    description,
    keywords: `${film.title}, ${keywords}, TrueFoundMovies, stream, rent, watch online`,
    openGraph: {
      title: film.title,
      description,
      type: "video.movie",
      url: `https://www.truefoundmovies.com/films/${slug}`,
      siteName: "TrueFoundMovies",
      images: film.posterUrl ? [{ url: film.posterUrl, alt: film.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${film.title} | TrueFoundMovies`,
      description,
      images: film.posterUrl ? [film.posterUrl] : [],
    },
    alternates: {
      canonical: `https://www.truefoundmovies.com/films/${slug}`,
    },
  }
}

export default async function FilmPage({ params }: Props) {
  const { slug } = await params
  const film = await prisma.film.findUnique({ where: { slug, active: true } })
  if (!film) notFound()

  const genre = CATEGORY_GENRE[film.category] ?? "Documentary"

  const movieJsonLd = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: film.title,
    description: film.description,
    director: { "@type": "Person", name: film.director },
    dateCreated: film.year.toString(),
    duration: `PT${film.runtime}M`,
    genre,
    image: film.posterUrl,
    url: `https://www.truefoundmovies.com/films/${slug}`,
    trailer: {
      "@type": "VideoObject",
      name: `${film.title} — Official Trailer`,
      embedUrl: `https://embed.vhx.tv/videos/${film.vimeoTrailerId}`,
      thumbnailUrl: film.posterUrl,
      description: `Official trailer for ${film.title}`,
    },
    offers: [
      {
        "@type": "Offer",
        name: "Rent",
        price: (film.rentalPrice / 100).toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Buy",
        price: (film.purchasePrice / 100).toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    ],
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "TrueFoundMovies", item: "https://www.truefoundmovies.com" },
      { "@type": "ListItem", position: 2, name: "Films", item: "https://www.truefoundmovies.com/films" },
      { "@type": "ListItem", position: 3, name: film.title, item: `https://www.truefoundmovies.com/films/${slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(movieJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main className="flex-1">
        {/* Trailer */}
        <div className="relative bg-black aspect-video max-h-[60vh] overflow-hidden">
          <iframe
            src={`https://embed.vhx.tv/videos/${film.vimeoTrailerId}?autoplay=1&muted=1`}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Quick-access CTA — immediately below trailer */}
        <div className="bg-[#0d0d0d] border-b border-[#222] px-6 py-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3">
            <h2 className="text-white font-black uppercase tracking-tight text-sm sm:text-base flex-1">
              {film.title}
            </h2>
            <div className="flex gap-3">
              <div className="flex-1 sm:flex-none sm:w-40">
                <PurchaseButtons filmId={film.id} type="RENTAL" label={`Rent · ${formatPrice(film.rentalPrice)}`} />
              </div>
              <div className="flex-1 sm:flex-none sm:w-40">
                <PurchaseButtons filmId={film.id} type="PURCHASE" label={`Buy · ${formatPrice(film.purchasePrice)}`} />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Film info */}
          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.3em] text-[#555] mb-2">
              {film.category.charAt(0) + film.category.slice(1).toLowerCase()} · {film.year} · {film.runtime} min
            </p>
            <h1 className="text-4xl font-black uppercase tracking-tight text-white mb-2">
              {film.title}
            </h1>
            <p className="text-sm text-[#888] mb-6">
              Directed by {film.director}
            </p>
            <p className="text-[#bbb] text-base leading-relaxed">
              {film.description}
            </p>
          </div>

          {/* Purchase panel */}
          <div className="border border-[#222] bg-[#111] rounded p-6 h-fit">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#555] mb-6">
              Get Access
            </h2>

            <div className="space-y-4">
              <div className="border border-[#2a2a2a] rounded p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display text-sm font-bold uppercase tracking-wider">
                    Rent
                  </span>
                  <span className="font-display text-lg font-black">
                    {formatPrice(film.rentalPrice)}
                  </span>
                </div>
                <p className="text-xs text-[#666] mb-4">
                  48-hour streaming access
                </p>
                <PurchaseButtons
                  filmId={film.id}
                  type="RENTAL"
                  label={`Rent · ${formatPrice(film.rentalPrice)}`}
                />
              </div>

              <div className="border border-[#2a2a2a] rounded p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display text-sm font-bold uppercase tracking-wider">
                    Own
                  </span>
                  <span className="font-display text-lg font-black">
                    {formatPrice(film.purchasePrice)}
                  </span>
                </div>
                <p className="text-xs text-[#666] mb-4">
                  Permanent streaming access
                </p>
                <PurchaseButtons
                  filmId={film.id}
                  type="PURCHASE"
                  label={`Buy · ${formatPrice(film.purchasePrice)}`}
                />
              </div>
            </div>

            <p className="text-xs text-[#555] mt-6 text-center">
              A watch link will be emailed to you after checkout.
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 border border-[#1a1a1a] rounded px-3 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-[#4ade80] flex-none" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
              </svg>
              <span className="text-[10px] uppercase tracking-widest text-[#555]">Secure Checkout · Powered by Stripe</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
