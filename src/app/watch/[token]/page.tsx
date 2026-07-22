import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import Header from "@/components/Header"
import BundlePlayer from "./BundlePlayer"

type Props = { params: Promise<{ token: string }> }

export const dynamic = "force-dynamic"

export default async function WatchPage({ params }: Props) {
  const { token } = await params

  const order = await prisma.order.findUnique({
    where: { accessToken: token },
    include: { film: true },
  })

  if (!order) notFound()

  const expired =
    order.expiresAt !== null && order.expiresAt < new Date()

  if (expired) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#555] mb-4">
              Access Expired
            </p>
            <h1 className="text-2xl font-black uppercase tracking-tight mb-4">
              Your rental has ended
            </h1>
            <p className="text-sm text-[#888] mb-8">
              Your 48-hour rental for{" "}
              <span className="text-white">{order.film.title}</span> has
              expired.
            </p>
            <a
              href={`/films/${order.film.slug}`}
              className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors inline-block"
            >
              Rent Again »
            </a>
          </div>
        </main>
      </>
    )
  }

  const expiryMsg =
    order.type === "RENTAL" && order.expiresAt
      ? `Rental expires ${order.expiresAt.toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}`
      : "Permanent access"

  // Bundle film: has a videos JSON array
  const videos = order.film.videos as { title: string; vhxId: string }[] | null

  if (videos && videos.length > 0) {
    return (
      <>
        <Header />
        <main className="flex-1 flex flex-col">
          <BundlePlayer
            videos={videos}
            filmTitle={order.film.title}
            director={order.film.director}
            year={order.film.year}
            expiryMsg={expiryMsg}
          />
        </main>
      </>
    )
  }

  // Single film: existing behavior
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        <div className="bg-black flex-1 flex items-center">
          <div className="w-full aspect-video">
            <iframe
              src={`https://embed.vhx.tv/videos/${order.film.vimeoFilmId}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="border-t border-[#222] px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-bold uppercase tracking-wider">
              {order.film.title}
            </h1>
            <p className="text-xs text-[#666] mt-0.5">
              {order.film.director} · {order.film.year}
            </p>
          </div>
          <p className="text-xs text-[#555] uppercase tracking-widest">
            {expiryMsg}
          </p>
        </div>
      </main>
    </>
  )
}
