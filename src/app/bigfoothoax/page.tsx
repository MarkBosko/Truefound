import { prisma } from "@/lib/db"
import { formatPrice } from "@/lib/stripe"

export const revalidate = 3600

export const metadata = {
  title: "The Bigfoot Hoax — The Truth They Tried to Bury",
  description:
    "Before Capturing Bigfoot premiered at SXSW in 2026, Hoax of the Century told the real story — in 2012. The people who proved it paid a price. Now you can finally watch it.",
}

async function getFilm() {
  return prisma.film.findFirst({
    where: { slug: "hoax-of-the-century", active: true },
  })
}

const HOTC_URL = "https://www.truefoundmovies.com/films/hoax-of-the-century"

const ICONIC_FOOTAGE = [
  { label: "Kennedy Assassination", note: "Zapruder's 27-second film, 1963" },
  { label: "Loch Ness Monster", note: "\"Nessie\" crossing the loch" },
  { label: "Hindenburg Disaster", note: "1937 newsreel footage" },
  { label: "Challenger Space Shuttle", note: "Broadcast live on CNN" },
  { label: "Apollo 11 Moon Landing", note: "First man on the moon, 1969" },
  { label: "The Patterson–Gimlin Film", note: "Bigfoot at Bluff Creek, 1967", highlight: true },
]

export default async function BigfootHoaxPage() {
  const film = await getFilm()

  return (
    <div className="min-h-screen bg-[#080808] text-[#e0ddd4]">

      {/* Nav */}
      <nav className="border-b border-[#181810] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#555]">
            Evidence File · 2012
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
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.8) 2px,rgba(255,255,255,0.8) 3px)",
          }}
        />

        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-16 items-center relative z-10">
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 border border-[#6b1818] text-[#9b2222] font-mono text-xs tracking-[0.35em] uppercase px-3 py-1.5 mb-10">
              <span>⚠</span> Suppressed · 2012 · Now Available
            </div>

            <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6 leading-[0.9]">
              They Said It<br />
              Was New.<br />
              <span className="text-[#c8a84b]">It Wasn&apos;t.</span>
            </h1>

            <p className="text-base text-[#999] leading-relaxed mb-6 max-w-xl">
              When <em>Capturing Bigfoot</em> premiered at SXSW in March 2026, the world
              called it groundbreaking. The definitive proof. The smoking gun.
            </p>
            <p className="text-base text-white font-bold leading-relaxed mb-6 max-w-xl">
              Tom Biscardi proved all of it — 14 years earlier. And they came after
              his family for it.
            </p>
            <p className="font-mono text-sm text-[#555] uppercase tracking-widest mb-12">
              The film they tried to bury is finally available to watch.
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

      {/* Iconic Footage section */}
      <section className="border-t border-[#141410] bg-[#0c0c08] px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="font-mono text-xs text-[#c8a84b] uppercase tracking-[0.4em] mb-3">
            File No. 001 — Context
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-6">
            The Films That Defined History
          </h2>
          <p className="text-[#999] leading-relaxed mb-12 text-base">
            A small number of film clips have been burned into the world&apos;s collective
            consciousness. Lasting only seconds on screen but a lifetime in our minds,
            these snippets of footage capture once-in-a-lifetime events — viewed
            millions of times, accepted by generations as proof-positive of their
            occurrence. While each has been debated, none had ever been conclusively
            proven fake.
          </p>

          <div className="space-y-px">
            {ICONIC_FOOTAGE.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-5 py-4 ${
                  item.highlight
                    ? "bg-[#c8a84b]/10 border border-[#c8a84b]/30"
                    : "bg-[#0f0f0a] border border-[#141410]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[#444] w-4">{i + 1}</span>
                  <span
                    className={`font-bold text-sm uppercase tracking-wide ${
                      item.highlight ? "text-[#c8a84b]" : "text-[#888]"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <span className="font-mono text-xs text-[#555] hidden sm:block">
                  {item.note}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 border-l-2 border-[#c8a84b] pl-6">
            <p className="text-white font-bold text-lg leading-relaxed">
              Until now. The Patterson–Gimlin Bigfoot film has been conclusively
              exposed as a hoax — for the first time, on camera, by the people who
              were there.
            </p>
          </div>
        </div>
      </section>

      {/* The Evidence */}
      <section className="border-t border-[#141410] px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="font-mono text-xs text-[#c8a84b] uppercase tracking-[0.4em] mb-3">
            File No. 002 — The Proof
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-10">
            What Hoax of the Century Documents
          </h2>

          <div className="space-y-6 text-[#999] leading-relaxed text-base">
            <p>
              Renowned Bigfoot researcher Tom Biscardi went beyond theory. He sat down
              with the people directly connected to the 1967 Patterson–Gimlin filming —
              and captured their accounts on camera.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {[
              {
                label: "The Man in the Suit",
                text: "Bob Heironimus has long claimed he was paid by Roger Patterson to walk across Bluff Creek in the Bigfoot costume. Biscardi put him on record.",
              },
              {
                label: "Firsthand Testimony",
                text: "Hoax of the Century features testimony from individuals directly involved in staging the footage — people who were there when it was filmed nearly 60 years ago.",
              },
              {
                label: "The Filmmaker Pays the Price",
                text: "When the film debuted in 2012, the backlash was immediate and vicious. Tom Biscardi and his family received harassment and threats from believers who refused to accept what the evidence showed. The film was suppressed.",
              },
            ].map((item) => (
              <div key={item.label} className="border border-[#1a1a14] bg-[#0c0c08] p-6">
                <div className="font-mono text-xs text-[#c8a84b] uppercase tracking-widest mb-3">
                  {item.label}
                </div>
                <p className="text-[#aaa] text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capturing Bigfoot / Overlook Festival */}
      <section className="border-t border-[#141410] bg-[#0c0c08] px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="font-mono text-xs text-[#9b2222] uppercase tracking-[0.4em] mb-3">
            File No. 003 — The 2026 Conspiracy
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-10">
            Capturing Bigfoot:<br />SXSW, Suppression, and a Story Already Told
          </h2>

          <div className="space-y-5 text-[#999] leading-relaxed text-base">
            <p>
              In March 2026, <em>Capturing Bigfoot</em> — directed by Marq Evans —
              premiered at the SXSW Film Festival to international headlines. The film
              presented what it called definitive proof: a newly discovered canister of
              16mm film, locked in a safe for over 50 years, showing a man rehearsing in
              the Bigfoot suit before the 1967 shoot. Roger Patterson&apos;s own son,
              Clint Patterson, appears in the film acknowledging the hoax. Bob
              Heironimus — the man in the suit — is central to the story.
            </p>

            <p>
              The coverage was breathless. &ldquo;Groundbreaking.&rdquo;
              &ldquo;Definitive.&rdquo; &ldquo;The smoking gun.&rdquo;
            </p>

            <div className="border border-[#9b2222]/30 bg-[#9b2222]/5 p-6 my-8">
              <p className="text-white font-bold leading-relaxed">
                Tom Biscardi documented all of this in 2012. Heironimus. The confession.
                The firsthand witnesses. The proof. He did it first — and paid for it
                with threats against his family.
              </p>
            </div>

            <p>
              <em>Capturing Bigfoot</em> was subsequently pulled from the Overlook Film
              Festival. Producers cited concerns about piracy — specifically, the risk
              of the film&apos;s unreleased test footage being covertly recorded and
              leaked online.
            </p>

            <p>
              Meanwhile, the film that told this story first — with more witnesses, more
              testimony, more history — has been sitting in the dark for over a decade.
              Until now.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-[#141410] px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="font-mono text-xs text-[#c8a84b] uppercase tracking-[0.4em] mb-3">
            Timeline of Suppression
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-14">
            The Record
          </h2>

          <div className="space-y-0">
            {[
              {
                year: "1967",
                text: "Roger Patterson and Bob Gimlin film the footage at Bluff Creek, CA. The world believes it is real. The hoax begins.",
              },
              {
                year: "2012",
                text: "Tom Biscardi releases Hoax of the Century — with on-camera testimony from people directly involved in staging the 1967 footage. The Bigfoot community responds with harassment and threats. The film is pulled from circulation.",
              },
              {
                year: "2026",
                text: "Capturing Bigfoot premieres at SXSW, presenting a \"newly discovered\" rehearsal film and interviews with the same key figures. The world calls it groundbreaking. It is pulled from the Overlook Film Festival over piracy concerns.",
              },
              {
                year: "NOW",
                text: "The original film — more complete, more honest, told by the people who were there first — is available to watch. Tom Biscardi is ready for the world to finally see it.",
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
                    <div className="w-px flex-1 bg-[#1a1a14] mt-1 min-h-[3rem]" />
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

      {/* CTA */}
      <section className="border-t border-[#141410] bg-[#0c0c08] px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="font-mono text-xs text-[#c8a84b] uppercase tracking-[0.4em] mb-3">
            See the Evidence
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-4">
            Hoax of the Century
          </h2>
          <p className="font-mono text-xs text-[#555] uppercase tracking-widest mb-10">
            Directed by Tom Biscardi &nbsp;·&nbsp; 2012 &nbsp;·&nbsp;{" "}
            <a
              href="https://www.imdb.com/title/tt2602644/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#c8a84b] transition-colors"
            >
              View on IMDB ↗
            </a>
          </p>

          {film && (
            <>
              <p className="text-[#999] leading-relaxed text-base mb-12 max-w-2xl">
                {film.description}
              </p>

              <div className="flex gap-4 flex-wrap mb-8">
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

              <p className="font-mono text-xs text-[#444] uppercase tracking-widest">
                Streaming via TrueFoundMovies.com · 48-hr rental or permanent access
              </p>
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
