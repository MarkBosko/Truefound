import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import FilmForm from "../FilmForm"

type Props = { params: Promise<{ id: string }> }

export default async function EditFilmPage({ params }: Props) {
  const { id } = await params
  const film = await prisma.film.findUnique({ where: { id } })
  if (!film) notFound()

  return (
    <div>
      <h1 className="text-xl font-black uppercase tracking-widest mb-8">
        Edit: {film.title}
      </h1>
      <FilmForm film={film} />
    </div>
  )
}
