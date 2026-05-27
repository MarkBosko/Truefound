import FilmForm from "../FilmForm"

export const metadata = { title: "Add Film — Admin" }

export default function NewFilmPage() {
  return (
    <div>
      <h1 className="text-xl font-black uppercase tracking-widest mb-8">Add Film</h1>
      <FilmForm />
    </div>
  )
}
