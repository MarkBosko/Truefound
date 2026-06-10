import Link from "next/link"
import Image from "next/image"
import { formatPrice } from "@/lib/stripe"

const CATEGORY_LABELS: Record<string, string> = {
  CRYPTIDS: "Cryptids",
  ALIENS: "Aliens",
  PARANORMAL: "Paranormal",
}

type FilmCardProps = {
  title: string
  slug: string
  director: string
  year: number
  category: string
  posterUrl: string
  rentalPrice: number
  purchasePrice: number
}

export default function FilmCard({
  title,
  slug,
  director,
  year,
  category,
  posterUrl,
  rentalPrice,
  purchasePrice,
}: FilmCardProps) {
  return (
    <Link href={`/films/${slug}`} className="group block">
      <div className="relative aspect-[2/3] overflow-hidden bg-[#161616] rounded">
        <Image
          src={posterUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="font-display text-xs text-[#aaa] uppercase tracking-widest">
            Rent {formatPrice(rentalPrice)} &nbsp;·&nbsp; Own {formatPrice(purchasePrice)}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-bold text-sm tracking-wide uppercase text-white group-hover:text-[#ccc] transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="text-xs text-[#666] mt-0.5">
          {director} · {year} · {CATEGORY_LABELS[category] ?? category}
        </p>
      </div>
    </Link>
  )
}
