import { notFound } from "next/navigation"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { prisma } from "@/lib/db"
import { formatPrice } from "@/lib/stripe"
import PurchaseButtons from "./PurchaseButtons"

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const film = await prisma.film.findUnique({ where: { slug, active: true } })
  if (!film) return {}
  return {
    title: `${film.title} — True Found`,
    description: film.description,
  }
}

export default async function FilmPage({ params }: Props) {
  const { slug } = await params
  const film = await prisma.film.findUnique({ where: { slug, active: true } })
  if (!film) notFound()

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Trailer */}
        <div className="relative bg-black aspect-video max-h-[60vh] overflow-hidden">
          <iframe
            src={`https://player.vimeo.com/video/${film.vimeoTrailerId}?autoplay=0&title=0&byline=0&portrait=0&color=ffffff`}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Film info */}
          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.3em] text-[#555] mb-2">
              {film.genre} · {film.year} · {film.runtime} min
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
                  <span className="text-sm font-bold uppercase tracking-wider">
                    Rent
                  </span>
                  <span className="text-lg font-black">
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
                  <span className="text-sm font-bold uppercase tracking-wider">
                    Own
                  </span>
                  <span className="text-lg font-black">
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
