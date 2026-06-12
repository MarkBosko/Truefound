import { prisma } from "@/lib/db"
import { formatPrice } from "@/lib/stripe"

export const revalidate = 3600

export const metadata = {
  title: "The Bigfoot Hoax — The Truth They Tried to Bury",
  description:
    "Before Shooting Bigfoot, there was Hoax of the Century. The real story of the Patterson-Gimlin film — told by the people who were actually there.",
}

async function getFilm() {
  return prisma.film.findFirst({
    where: { slug: "hoax-of-the-century", active: true },
  })
}

const HOTC_URL = "https://www.truefoundmovies.com/films/hoax-of-the-century"

export default async function BigfootHoaxPage() {
  const film = await getFilm()

  return (
    <div className="min-h-screen bg-[#080808] text-[#e0ddd4]">

      {/* Nav */}
      <nav className="border-b border-[#181810] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#555]">
            Evidence File
          </span>
          <a
            href="https://www.truefoundmovies.com"
            className="font-mono text-xs uppercase tracking-widest text-[#555] hover:text-[#c8a84b] transition-colors"
          >
            TrueFoundMovies.com
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center px-6 py-24 overflow-hidden">
        {/* Scanline texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.8) 2px,rgba(255,255,255,0.8) 3px)",
          }}
        />

        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-16 items-center relative z-10">
          {/* Text — wider column */}
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 border border-[#6b1818] text-[#9b2222] font-mono text-xs tracking-[0.35em] uppercase px-3 py-1.5 mb-10">
              <span>⚠</span> Suppressed · 2012
            </div>

            <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6 leading-[0.9]">
              They Knew<br />
              <span className="text-[#c8a84b]">14 Years</span><br />
              Before<br />
              Shooting Bigfoot
            </h1>

            <p className="text-base text-[#999] leading-relaxed mb-6 max-w-xl">
              The Patterson-Gimlin film was a hoax. Tom Biscardi proved it — with
              interviews from the people who were <em>actually there</em> in 1967.
              Then they came after his family.
            </p>

            <p className="font-mono text-sm text-[#555] uppercase tracking-widest mb-12">
              Now you can finally see what they didn't want you to see.
            </p>

            {film && (
              <div className="flex gap-4 flex-wrap">
                <a
                  href={HOTC_URL}
                  className="bg-[#c8a84b] text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#dbb85a] transition-colors"
                >
                  Rent — {formatPrice(film.rentalPrice)}
                </a>
                <a
                  href={HOTC_URL}
                  className="border border-[#c8a84b] text-[#c8a84b] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#c8a84b] hover:text-black transition-colors"
                >
                  Own It — {formatPrice(film.purchasePrice)}
                </a>
              </div>
            )}
          </div>

          {/* Poster */}
          {film?.posterUrl && (
            <div className="lg:col-span-2 relative">
              <div className="absolute -inset-6 bg-[#c8a84b]/5 blur-2xl rounded-full" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={film.posterUrl}
                alt="Hoax of the Century"
                className="relative w-full max-w-xs mx-auto shadow-2xl shadow-black"
                style={{ border: "1px solid rgba(200,168,75,0.15)" }}
              />
            </div>
          )}
        </div>
      </section>

      {/* The Story */}
      <section className="border-t border-[#141410] px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="font-mono text-xs text-[#c8a84b] uppercase tracking-[0.4em] mb-3">
            File No. 001 — The Patterson-Gimlin Film
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-10">
            The Hoax That Fooled the World for 60 Years
          </h2>
          <div className="space-y-5 text-[#999] leading-relaxed text-base">
            <p>
              In 1967, Roger Patterson and Bob Gimlin filmed what they claimed was a living
              Bigfoot in Bluff Creek, California. The footage became the most scrutinized
              piece of film in cryptozoological history — studied by scientists, debated by
              experts, and accepted by millions as proof of an unknown species.
            </p>
            <p>
              It was a hoax. And the people involved told filmmaker Tom Biscardi everything.
            </p>
            <p className="text-white text-lg font-bold leading-relaxed border-l-2 border-[#c8a84b] pl-6">
              Biscardi didn&apos;t just investigate — he sat down with the people who were
              actually there. The interviews he captured are the most comprehensive
              firsthand account of one of America&apos;s greatest deceptions ever put on film.
            </p>
            <p>
              When the film came out, the backlash was immediate and overwhelming. Tom
              Biscardi and his family received harassment and threats from people who
              refused to accept the truth. The film was pushed aside. The story was buried.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-[#141410] bg-[#0c0c08] px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="font-mono text-xs text-[#c8a84b] uppercase tracking-[0.4em] mb-3">
            Timeline of Suppression
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-14">
            60 Years of Deception
          </h2>

          <div className="space-y-0">
            {[
              {
                year: "1967",
                text: "Patterson and Gimlin film the footage at Bluff Creek, CA. The world believes Bigfoot is real.",
              },
              {
                year: "2010s",
                text: "Tom Biscardi conducts exclusive interviews with individuals directly connected to the original hoax — people who were there when it happened.",
              },
              {
                year: "2012",
                text: "Hoax of the Century is released. The backlash is immediate. Biscardi and his family are harassed and threatened. Believers don't want the truth.",
              },
              {
                year: "2024",
                text: "Shooting Bigfoot claims to break the same story — 14 years later. It is pulled from film festival screenings. Producers cite piracy fears.",
              },
              {
                year: "NOW",
                text: "The film Biscardi made first — with more evidence, more witnesses, more truth — is finally available to watch.",
                highlight: true,
              },
            ].map((item, i, arr) => (
              <div key={i} className="flex gap-8 relative">
                <div className="flex flex-col items-center flex-shrink-0 w-4">
                  <div
                    className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                      item.highlight ? "bg-[#c8a84b]" : "bg-[#2a2a20]"
                    }`}
                  />
                  {i < arr.length - 1 && (
                    <div className="w-px flex-1 bg-[#1a1a14] mt-1 mb-0 min-h-[3rem]" />
                  )}
                </div>
                <div className="pb-10">
                  <div
                    className={`font-mono text-xs font-bold mb-2 uppercase tracking-widest ${
                      item.highlight ? "text-[#c8a84b]" : "text-[#555]"
                    }`}
                  >
                    {item.year}
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      item.highlight ? "text-white font-bold" : "text-[#777]"
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shooting Bigfoot */}
      <section className="border-t border-[#141410] px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="font-mono text-xs text-[#9b2222] uppercase tracking-[0.4em] mb-3">
            The Conspiracy Continues
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-10">
            Why Was Shooting Bigfoot<br />Pulled From Film Festivals?
          </h2>
          <div className="space-y-5 text-[#999] leading-relaxed text-base">
            <p>
              <em>Shooting Bigfoot</em> premiered with significant attention — promising
              to finally expose the truth about the Patterson-Gimlin footage. Then it
              vanished from scheduled festival screenings. Producers cited concerns about
              piracy.
            </p>
            <p>
              But Tom Biscardi documented this truth years earlier. His subjects — people
              with direct, firsthand knowledge of the 1967 hoax — are on camera, on
              record, in their own words.
            </p>
            <div className="border border-[#9b2222]/30 bg-[#9b2222]/5 p-6 my-8">
              <p className="text-white font-bold leading-relaxed">
                Hoax of the Century doesn&apos;t just cover the same ground as Shooting
                Bigfoot — it goes further. With interviews from people directly involved
                in the original 1967 hoax, it is the more complete, more truthful, more
                important film.
              </p>
            </div>
            <p>
              Tom Biscardi paid a price for making this film. His family was threatened.
              He was attacked publicly by people who wanted to keep believing. He made it
              anyway. Now, more than a decade later, he is ready for the world to see it.
            </p>
          </div>
        </div>
      </section>

      {/* The Film / CTA */}
      <section className="border-t border-[#141410] bg-[#0c0c08] px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="font-mono text-xs text-[#c8a84b] uppercase tracking-[0.4em] mb-3">
            See the Evidence
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-10">
            Hoax of the Century
          </h2>

          {film && (
            <>
              <div className="grid grid-cols-3 gap-px border border-[#1a1a14] mb-10 overflow-hidden">
                {[
                  { label: "Year", value: String(film.year) },
                  { label: "Runtime", value: `${film.runtime} min` },
                  { label: "Director", value: film.director },
                ].map((item) => (
                  <div key={item.label} className="bg-[#0f0f0a] p-4">
                    <div className="font-mono text-xs text-[#555] uppercase tracking-widest mb-1">
                      {item.label}
                    </div>
                    <div className="text-white text-sm font-bold">{item.value}</div>
                  </div>
                ))}
              </div>

              <p className="text-[#999] leading-relaxed text-base mb-12">
                {film.description}
              </p>

              <div className="flex gap-4 flex-wrap">
                <a
                  href={HOTC_URL}
                  className="bg-[#c8a84b] text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#dbb85a] transition-colors"
                >
                  Rent — {formatPrice(film.rentalPrice)}
                </a>
                <a
                  href={HOTC_URL}
                  className="border border-[#c8a84b] text-[#c8a84b] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#c8a84b] hover:text-black transition-colors"
                >
                  Own It — {formatPrice(film.purchasePrice)}
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#141410] px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-[#333] uppercase tracking-widest">
            © {new Date().getFullYear()}{" "}BigfootHoax.com
          </p>
          <p className="font-mono text-xs text-[#333] uppercase tracking-widest">
            Streaming via{" "}
            <a
              href="https://www.truefoundmovies.com"
              className="text-[#555] hover:text-[#c8a84b] transition-colors"
            >
              TrueFoundMovies.com
            </a>
          </p>
        </div>
      </footer>

    </div>
  )
}
