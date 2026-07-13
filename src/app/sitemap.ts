import { MetadataRoute } from "next"
import { prisma } from "@/lib/db"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const films = await prisma.film.findMany({
    where: { active: true },
    select: { slug: true, updatedAt: true },
  })

  const filmEntries: MetadataRoute.Sitemap = films.map((film) => ({
    url: `https://www.truefoundmovies.com/films/${film.slug}`,
    lastModified: film.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [
    {
      url: "https://www.truefoundmovies.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://www.truefoundmovies.com/films",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...filmEntries,
  ]
}
