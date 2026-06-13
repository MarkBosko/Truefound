import { prisma } from "@/lib/db"
import { formatPrice } from "@/lib/stripe"
import StickyBar from "./StickyBar"

export const revalidate = 60

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
        {/* Hero background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(https://res.cloudinary.com/dm7ckxbgc/image/upload/v1781280563/BF_News_image_qlqnbb.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Dark gradient overlay — heavier on the left so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/50" />
        {/* Scanline texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.8) 2px,rgba(255,255,255,0.8) 3px)",
          }}
        />

        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-16 items-center relative z-10">
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 border border-[#cc2222] text-[#ff4444] font-mono text-xs tracking-[0.35em] uppercase px-3 py-1.5 mb-10">
              <span>⚠</span> Suppressed · 2012 · Now Available
            </div>

            <div className="relative mb-6">
              <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.9]">
                They Said It<br />
                Was New.<br />
                <span className="text-[#c8a84b]">It Wasn&apos;t.</span>
              </h1>
              <div className="absolute right-0 top-[58px] lg:top-[116px] w-20 lg:w-24">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://res.cloudinary.com/dm7ckxbgc/image/upload/w_200,q_auto/v1781366367/3E38BHH_meyrf3.jpg"
                    alt=""
                    aria-hidden="true"
                    className="w-full block"
                  />
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#cc0000" strokeWidth="6"/>
                    <line x1="18" y1="18" x2="82" y2="82" stroke="#cc0000" strokeWidth="6"/>
                  </svg>
                </div>
              </div>
            </div>

            <p className="text-lg text-[#999] leading-relaxed mb-6 max-w-xl">
              When <em>Capturing Bigfoot</em> premiered at SXSW in March 2026, the world
              called it groundbreaking. The definitive proof. The smoking gun.
            </p>
            <div className="border-l-4 border-[#c8a84b] pl-5 mb-6 max-w-xl">
              <p className="text-2xl text-white font-black leading-snug">
                Tom Biscardi proved all of it — 14 years earlier. And they came after his family for it.
              </p>
            </div>
            <p className="font-mono text-sm text-[#555] uppercase tracking-widest mb-12">
              The film they tried to bury is finally available to watch.
            </p>

            {film && (
              <div className="flex gap-4 flex-wrap">
                <a href={HOTC_URL} className="bg-[#c8a84b] text-black px-8 py-4 hover:bg-[#dbb85a] transition-colors text-center">
                  <div className="font-mono text-xs uppercase tracking-widest mb-0.5">Rent</div>
                  <div className="text-2xl font-black">{formatPrice(film.rentalPrice)}</div>
                </a>
                <a href={HOTC_URL} className="border border-[#c8a84b] text-[#c8a84b] px-8 py-4 hover:bg-[#c8a84b] hover:text-black transition-colors text-center">
                  <div className="font-mono text-xs uppercase tracking-widest mb-0.5">Own It</div>
                  <div className="text-2xl font-black">{formatPrice(film.purchasePrice)}</div>
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="font-mono text-xs text-[#555] uppercase tracking-[0.4em]">Scroll</span>
          <div className="animate-bounce text-[#c8a84b]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </section>

      {/* Trailer */}
      <section className="border-t border-[#141410] bg-[#0c0c08] px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="font-mono text-xs text-[#c8a84b] uppercase tracking-[0.4em] mb-4">
            Watch the Trailer
          </div>
          <div className="relative w-full aspect-video bg-black">
            <iframe
              src="https://embed.vhx.tv/videos/3999458?autoplay=0"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
          {film && (
            <div className="flex gap-4 flex-wrap mt-8">
              <a href={HOTC_URL} className="bg-[#c8a84b] text-black px-8 py-4 hover:bg-[#dbb85a] transition-colors text-center">
                <div className="font-mono text-xs uppercase tracking-widest mb-0.5">Rent</div>
                <div className="text-2xl font-black">{formatPrice(film.rentalPrice)}</div>
              </a>
              <a href={HOTC_URL} className="border border-[#c8a84b] text-[#c8a84b] px-8 py-4 hover:bg-[#c8a84b] hover:text-black transition-colors text-center">
                <div className="font-mono text-xs uppercase tracking-widest mb-0.5">Own It</div>
                <div className="text-2xl font-black">{formatPrice(film.purchasePrice)}</div>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Comparison: Capturing Bigfoot vs Hoax of the Century */}
      <section className="border-t border-[#141410] bg-[#080808] px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-xs text-[#ff4444] uppercase tracking-[0.4em] mb-3">
            File No. 004 — The Comparison
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-4">
            Two Films. One Story.<br />
            <span className="text-[#c8a84b]">Only One You Can Watch.</span>
          </h2>
          <p className="text-[#777] text-lg leading-relaxed mb-14 max-w-2xl">
            The <em>Wall Street Journal</em> called the Bigfoot phenomenon a &ldquo;prequel to the confusion
            that has engulfed our era.&rdquo; Here is a guide to that confusion.
          </p>

          {/* Side-by-side comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-[#1e1e18]">

            {/* Capturing Bigfoot column */}
            <div className="border-b sm:border-b-0 sm:border-r border-[#1e1e18]">
              <div className="px-6 py-4 border-b border-[#1e1e18] bg-[#100a0a]">
                <div className="font-mono text-xs text-[#ff4444] uppercase tracking-[0.4em] mb-1">2026</div>
                <div className="text-lg font-black text-white uppercase tracking-tight">Capturing Bigfoot</div>
                <div className="font-mono text-xs text-[#444] uppercase tracking-widest mt-1">Dir. Marq Evans</div>
              </div>
              <div className="px-6 py-8 bg-[#0c0a0a] space-y-5">
                {[
                  { icon: "✓", label: "Premiered at SXSW", color: "#555" },
                  { icon: "✓", label: "Newly discovered rehearsal footage", color: "#555" },
                  { icon: "✓", label: "Bob Heironimus (the man in the suit)", color: "#555" },
                  { icon: "✓", label: "Clint Patterson (Roger's son)", color: "#555" },
                  { icon: "✓", label: "Greg Long (author, financial motives)", color: "#555" },
                  { icon: "✗", label: "Philip Morris (the suit maker)", color: "#441111" },
                  { icon: "✗", label: "Vilma Radford (the investor)", color: "#441111" },
                  { icon: "✗", label: "14 years of forensic investigation", color: "#441111" },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`text-sm font-bold mt-0.5 flex-shrink-0 ${row.icon === "✓" ? "text-[#555]" : "text-[#ff4444]"}`}>
                      {row.icon}
                    </span>
                    <span className={`text-sm leading-snug ${row.icon === "✓" ? "text-[#666]" : "text-[#cc3333]"}`}>
                      {row.label}
                    </span>
                  </div>
                ))}
                <div className="pt-4 border-t border-[#1e1e18]">
                  <div className="inline-flex items-center gap-2 border border-[#cc2222]/50 bg-[#cc2222]/10 text-[#ff4444] font-mono text-xs uppercase tracking-widest px-3 py-2">
                    <span>⚠</span> NOT available to stream anywhere
                  </div>
                </div>
              </div>
            </div>

            {/* Hoax of the Century column */}
            <div>
              <div className="px-6 py-4 border-b border-[#1e1e18] bg-[#0a0e08]">
                <div className="font-mono text-xs text-[#c8a84b] uppercase tracking-[0.4em] mb-1">2012 · Suppressed. Now Available.</div>
                <div className="text-lg font-black text-white uppercase tracking-tight">Hoax of the Century</div>
                <div className="font-mono text-xs text-[#444] uppercase tracking-widest mt-1">Dir. Tom Biscardi</div>
              </div>
              <div className="px-6 py-8 bg-[#0a0c08] space-y-5">
                {[
                  { icon: "✓", label: "Released in 2012 — before the headlines", color: "#c8a84b" },
                  { icon: "✓", label: "On-camera testimony by ALL key players", color: "#c8a84b" },
                  { icon: "✓", label: "Bob Heironimus on record", color: "#c8a84b" },
                  { icon: "✓", label: "Philip Morris — explains exactly how the suit was modified to deceive the world", color: "#c8a84b" },
                  { icon: "✓", label: "Vilma Radford — the investor who financed the expeditions and the PG film itself", color: "#c8a84b" },
                  { icon: "✓", label: "Greg Long — author of The Making of Bigfoot, financial motives exposed", color: "#c8a84b" },
                  { icon: "✓", label: "Decisive evidence: a \"money train\" running for nearly five decades", color: "#c8a84b" },
                  { icon: "✓", label: "Tom Biscardi's family was threatened. Film suppressed for 12 years.", color: "#c8a84b" },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#c8a84b] text-sm font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-sm text-[#aaa] leading-snug">{row.label}</span>
                  </div>
                ))}
                <div className="pt-4 border-t border-[#1e1e18]">
                  <a href={HOTC_URL} className="inline-flex items-center gap-2 border border-[#c8a84b]/50 bg-[#c8a84b]/10 text-[#c8a84b] font-mono text-xs uppercase tracking-widest px-3 py-2 hover:bg-[#c8a84b]/20 transition-colors">
                    <span>▶</span> Stream It Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quote from Biscardi */}
          <div className="mt-12 border-l-4 border-[#c8a84b] pl-6">
            <blockquote className="text-white text-xl font-bold leading-relaxed mb-3">
              &ldquo;We didn&apos;t just find a tape. We found the people. We have the man who wore the suit, the man
              who sold the suit, and the researchers who spent decades deconstructing the lies.&rdquo;
            </blockquote>
            <cite className="font-mono text-xs text-[#555] uppercase tracking-widest not-italic">
              — Tom Biscardi, CEO, Searching for Bigfoot, Inc.
            </cite>
          </div>

          {film && (
            <div className="flex gap-4 flex-wrap mt-12">
              <a href={HOTC_URL} className="bg-[#c8a84b] text-black px-8 py-4 hover:bg-[#dbb85a] transition-colors text-center">
                <div className="font-mono text-xs uppercase tracking-widest mb-0.5">Rent</div>
                <div className="text-2xl font-black">{formatPrice(film.rentalPrice)}</div>
              </a>
              <a href={HOTC_URL} className="border border-[#c8a84b] text-[#c8a84b] px-8 py-4 hover:bg-[#c8a84b] hover:text-black transition-colors text-center">
                <div className="font-mono text-xs uppercase tracking-widest mb-0.5">Own It</div>
                <div className="text-2xl font-black">{formatPrice(film.purchasePrice)}</div>
              </a>
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
          <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-6">
            The Films That Defined History
          </h2>
          <p className="text-[#999] leading-relaxed mb-12 text-lg">
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

          {/* The iconic frame */}
          <div className="mt-10 mb-8 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/dm7ckxbgc/image/upload/w_900,q_auto/v1781286764/Patterson_Gimlin_Bigfoot_j0eqir.jpg"
              alt="The Patterson-Gimlin film, 1967"
              className="w-full"
              style={{ filter: "sepia(30%) contrast(1.1) brightness(0.8)", border: "1px solid rgba(200,168,75,0.15)" }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-4">
              <p className="font-mono text-xs text-[#c8a84b] uppercase tracking-widest">
                The Patterson–Gimlin Film · Bluff Creek, CA · October 20, 1967
              </p>
            </div>
          </div>

          <div className="border-l-2 border-[#c8a84b] pl-6">
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
          <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-10">
            What Hoax of the Century Documents
          </h2>

          <div className="flex flex-col sm:flex-row gap-10 items-start mt-2 mb-10">
            <p className="text-[#999] leading-relaxed text-lg flex-1">
              Renowned Bigfoot researcher Tom Biscardi went beyond theory. He sat down
              with the people directly connected to the 1967 Patterson–Gimlin filming —
              and captured their accounts on camera.
            </p>
            <div className="flex-shrink-0 sm:w-48">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://res.cloudinary.com/dm7ckxbgc/image/upload/w_400,e_upscale,q_auto/v1781291525/tom_team_xd5ylw.jpg"
                alt="Tom Biscardi and his expedition team"
                className="w-full"
                style={{ border: "1px solid rgba(200,168,75,0.15)", filter: "contrast(1.1) brightness(0.9)" }}
              />
              <p className="font-mono text-xs text-[#444] uppercase tracking-widest mt-2 text-center">
                Tom Biscardi · Expedition Team
              </p>
            </div>
          </div>

          <div className="space-y-6">
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
                <p className="text-[#aaa] text-base leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capturing Bigfoot / Overlook Festival */}
      <section className="border-t border-[#141410] relative px-6 py-24 overflow-hidden">
        {/* Trail-cam background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(https://res.cloudinary.com/dm7ckxbgc/image/upload/v1781280555/PURSUITnew_zl8ouo.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        <div className="absolute inset-0 bg-[#080808]/92" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="font-mono text-xs text-[#ff4444] uppercase tracking-[0.4em] mb-3">
            File No. 003 — The 2026 Conspiracy
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-10">
            Capturing Bigfoot:<br />SXSW, Suppression, and a Story Already Told
          </h2>

          <div className="space-y-5 text-[#999] leading-relaxed text-lg">
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

            <div className="border border-[#cc2222]/50 bg-[#cc2222]/8 p-6 my-8">
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
          <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-14">
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
                    className={`text-base leading-relaxed ${
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
          <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-4">
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
              <p className="text-[#999] leading-relaxed text-lg mb-12 max-w-2xl">
                {film.description}
              </p>

              {/* What you get */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <a href={HOTC_URL} className="group block border border-[#c8a84b]/40 bg-[#0f0f0a] hover:bg-[#c8a84b]/10 hover:border-[#c8a84b] transition-all p-6">
                  <div className="font-mono text-xs text-[#666] uppercase tracking-widest mb-3">Rent</div>
                  <div className="text-5xl font-black text-[#c8a84b] mb-3">{formatPrice(film.rentalPrice)}</div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-[#aaa]">
                      <span className="text-[#c8a84b]">✓</span> 48-hour streaming access
                    </li>
                    <li className="flex items-center gap-2 text-sm text-[#aaa]">
                      <span className="text-[#c8a84b]">✓</span> Watch on any device
                    </li>
                    <li className="flex items-center gap-2 text-sm text-[#aaa]">
                      <span className="text-[#c8a84b]">✓</span> Link emailed instantly
                    </li>
                  </ul>
                  <div className="mt-5 text-xs font-bold uppercase tracking-widest text-[#c8a84b] group-hover:underline">
                    Rent Now →
                  </div>
                </a>

                <a href={HOTC_URL} className="group block border border-[#c8a84b] bg-[#c8a84b]/5 hover:bg-[#c8a84b]/15 transition-all p-6 relative">
                  <div className="absolute top-3 right-3 font-mono text-xs bg-[#c8a84b] text-black px-2 py-0.5 uppercase tracking-widest">Best Value</div>
                  <div className="font-mono text-xs text-[#666] uppercase tracking-widest mb-3">Own It</div>
                  <div className="text-5xl font-black text-[#c8a84b] mb-3">{formatPrice(film.purchasePrice)}</div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-[#aaa]">
                      <span className="text-[#c8a84b]">✓</span> Permanent streaming access
                    </li>
                    <li className="flex items-center gap-2 text-sm text-[#aaa]">
                      <span className="text-[#c8a84b]">✓</span> Watch anytime, forever
                    </li>
                    <li className="flex items-center gap-2 text-sm text-[#aaa]">
                      <span className="text-[#c8a84b]">✓</span> Link emailed instantly
                    </li>
                  </ul>
                  <div className="mt-5 text-xs font-bold uppercase tracking-widest text-[#c8a84b] group-hover:underline">
                    Own It Now →
                  </div>
                </a>
              </div>

              <p className="font-mono text-xs text-[#444] uppercase tracking-widest">
                Secure checkout via Stripe · Streaming on TrueFoundMovies.com
              </p>
            </>
          )}
        </div>
      </section>

      {/* Sticky CTA bar */}
      {film && (
        <StickyBar
          rentalPrice={formatPrice(film.rentalPrice)}
          purchasePrice={formatPrice(film.purchasePrice)}
          href={HOTC_URL}
        />
      )}

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
