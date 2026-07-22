import { prisma } from "@/lib/db"
import { formatPrice } from "@/lib/stripe"
import StickyBar from "./StickyBar"

export const revalidate = 60

export const metadata = {
  title: "June 9 — The Complete Collection | HelltownOhio.com",
  description:
    "What happened on June 9? The Boston Mills 5 were never heard from again...until now. Witness the complete recording of the horrors surrounding June 9. The first scream was for fun. The second scream was for help.",
}

const JUNE9_SLUG = "june-9"
const JUNE9_URL = `https://www.truefoundmovies.com/films/${JUNE9_SLUG}`

const STILLS = [
  { url: "https://res.cloudinary.com/dm7ckxbgc/image/upload/w_800,q_auto/v1784578387/BM_Sign_osf4vg.jpg",     label: "CAM-01", time: "14:32:07", tape: "TAPE_A" },
  { url: "https://res.cloudinary.com/dm7ckxbgc/image/upload/w_800,q_auto/v1784578388/Kids_s3ekqg.jpg",       label: "CAM-02", time: "14:38:44", tape: "TAPE_A" },
  { url: "https://res.cloudinary.com/dm7ckxbgc/image/upload/w_800,q_auto/v1784578389/Triple_cross_rkj258.jpg", label: "CAM-03", time: "15:11:02", tape: "TAPE_B" },
  { url: "https://res.cloudinary.com/dm7ckxbgc/image/upload/w_800,q_auto/v1784578390/Upside_down_qfs4ay.jpg", label: "CAM-01", time: "16:04:18", tape: "TAPE_B" },
  { url: "https://res.cloudinary.com/dm7ckxbgc/image/upload/w_800,q_auto/v1784578389/Statues_jgsvhn.jpg",    label: "CAM-02", time: "16:47:55", tape: "TAPE_C" },
  { url: "https://res.cloudinary.com/dm7ckxbgc/image/upload/w_800,q_auto/v1784578388/Pig_stall_d5cv4i.jpg",  label: "CAM-03", time: "17:23:31", tape: "TAPE_C" },
]

const BUNDLE_CONTENTS = [
  { label: "June 9",                        note: "The feature film — 1 hr 32 min", main: true },
  { label: "Director Commentary",            note: "T. Michael Conway on every scene" },
  { label: "Auditions",                     note: "The original casting sessions" },
  { label: "Deleted Scenes",                note: "What was left on the cutting room floor" },
  { label: "Original Opening / Ending",     note: "The film as it was first conceived" },
  { label: "Helltown: Making June 9",       note: "Full behind-the-scenes documentary" },
  { label: "Key Art Concepts",              note: "Evolution of the film's visual identity" },
  { label: "Streaming Ad",                  note: "Original promotional spot" },
  { label: "Promotional 2025",              note: "2025 re-release campaign" },
  { label: "Promotional 2026",              note: "2026 campaign materials" },
  { label: "Trailer",                       note: "The official theatrical trailer" },
]

async function getFilm() {
  return prisma.film.findFirst({ where: { slug: JUNE9_SLUG, active: true } })
}

export default async function HelltownOhioPage() {
  const film = await getFilm()

  return (
    <div className="min-h-screen bg-[#050505] text-[#d0d0d0] overflow-x-hidden">

      {/* Global scan-line overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)",
        }}
      />

      {/* Nav */}
      <nav className="relative z-10 border-b border-[#0f1a0f] bg-[#050505]/90 backdrop-blur px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#cc2222] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#2a4a2a]">REC</span>
            <span className="font-mono text-xs text-[#2a4a2a] tracking-widest">06.09.2008 · 14:32:07</span>
          </div>
          <a
            href="https://www.truefoundmovies.com"
            className="font-mono text-xs uppercase tracking-widest text-[#333] hover:text-[#4a7a4a] transition-colors"
          >
            TrueFoundMovies.com
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center px-6 py-24 overflow-hidden">
        {/* Background: Boston Mills sign */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(https://res.cloudinary.com/dm7ckxbgc/image/upload/w_1920,q_auto,e_grayscale/v1784578387/BM_Sign_osf4vg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.3) contrast(1.2)",
          }}
        />
        {/* Green night-vision tint */}
        <div className="absolute inset-0 bg-[#001a00]/60 mix-blend-multiply" />
        {/* Heavy vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)" }} />

        {/* Camera UI — top left */}
        <div className="absolute top-6 left-6 z-10 font-mono text-xs text-[#1a5a1a] space-y-1 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#cc2222] animate-pulse" />
            <span>REC</span>
          </div>
          <div>06.09.2008</div>
          <div>14:32:07</div>
          <div>CAM-01</div>
          <div>TAPE_A</div>
        </div>

        {/* Camera UI — top right */}
        <div className="absolute top-6 right-6 z-10 font-mono text-xs text-[#1a5a1a] text-right space-y-1 uppercase tracking-widest">
          <div>BOSTON MILLS, OH</div>
          <div>40°58&apos;12&quot;N 81°33&apos;47&quot;W</div>
          <div>BATT ████░ 82%</div>
          <div>AUTO FOCUS</div>
        </div>

        {/* Corner frames */}
        {[
          "top-4 left-4 border-t border-l",
          "top-4 right-4 border-t border-r",
          "bottom-4 left-4 border-b border-l",
          "bottom-4 right-4 border-b border-r",
        ].map((cls, i) => (
          <div key={i} className={`absolute ${cls} border-[#1a4a1a] w-8 h-8 z-10`} />
        ))}

        <div className="max-w-5xl mx-auto w-full relative z-10">
          <p className="font-mono text-xs text-[#1a5a1a] uppercase tracking-[0.5em] mb-8">
            [RECOVERED FOOTAGE — EVIDENCE FILE 06.09.2008]
          </p>

          <h1 className="text-[clamp(5rem,18vw,14rem)] font-black uppercase leading-[0.85] text-white mb-6" style={{ textShadow: "0 0 60px rgba(0,255,0,0.08)" }}>
            JUNE<br />
            <span className="text-[#cc2222]" style={{ textShadow: "0 0 40px rgba(204,34,34,0.4)" }}>9</span>
          </h1>

          <div className="border-l-2 border-[#cc2222] pl-5 mb-8 max-w-xl">
            <p className="text-xl text-white font-bold leading-snug">
              Leave now. Go fast. Never return.
            </p>
          </div>

          <p className="font-mono text-sm text-[#cc2222] uppercase tracking-widest mb-12">
            The first scream was for fun.&nbsp; The second scream was for help.
          </p>

          {film ? (
            <a href={JUNE9_URL} className="inline-block bg-[#cc2222] text-white px-10 py-4 hover:bg-[#dd3333] transition-colors">
              <div className="font-mono text-xs uppercase tracking-widest mb-0.5">Own the Complete Collection</div>
              <div className="text-2xl font-black">{formatPrice(film.purchasePrice)}</div>
            </a>
          ) : (
            <a href={JUNE9_URL} className="inline-block border border-[#cc2222] text-[#cc2222] px-10 py-4 hover:bg-[#cc2222]/10 transition-colors font-mono text-xs uppercase tracking-widest">
              Get the Complete Collection →
            </a>
          )}
        </div>

        {/* Bottom scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="font-mono text-xs text-[#1a3a1a] uppercase tracking-[0.4em]">[ scroll ]</span>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t border-[#0f1a0f] bg-[#030805] px-6 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#0a1a0a]">
          {[
            { quote: "The most shocking and downright chilling horror movie I've seen in a good long time.", source: "Film Threat", stars: 4 },
            { quote: "Delivers the chills reality horror fans are looking for with a great, gory twist.", source: "DreadCentral" },
          ].map((r) => (
            <div key={r.source} className="bg-[#030805] p-6">
              {"stars" in r && r.stars && (
                <div className="text-[#cc2222] text-sm mb-3 font-mono">{"★".repeat(r.stars)}{"☆".repeat(4 - r.stars)}</div>
              )}
              <p className="text-white text-base font-bold leading-snug mb-3">&ldquo;{r.quote}&rdquo;</p>
              <p className="font-mono text-xs text-[#2a5a2a] uppercase tracking-widest">— {r.source}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Story */}
      <section className="border-t border-[#0f1a0f] px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs text-[#2a5a2a] uppercase tracking-[0.5em] mb-4">
            [INCIDENT REPORT — BOSTON TOWNSHIP, SUMMIT COUNTY, OHIO]
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-10">
            They went in with cameras.<br />
            <span className="text-[#cc2222]">Only the cameras came out.</span>
          </h2>
          <div className="space-y-5 text-[#888] leading-relaxed text-lg font-mono text-sm">
            <p className="text-white font-bold text-base">
              What happened on June 9?
            </p>
            <p>
              On a search for some harmless fun at the end of the school year,
              17-year-old Derek Boggman led his friends on a mischievous journey
              of caught-on-camera pranks. But on their quest to find even bigger
              thrills, something else found them first.
            </p>
            <p className="text-white font-bold text-base">
              The &ldquo;Boston Mills 5&rdquo; were never heard from again&hellip;until now.
            </p>
            <p>
              Witness the complete recording of the horrors surrounding June 9.
              The first scream was for fun. The second scream was for help.
            </p>
          </div>
          <div className="mt-8 border border-[#1a2a1a] bg-[#030805] p-4 font-mono text-xs text-[#2a5a2a] space-y-1 uppercase tracking-widest">
            <p>Directed by T. Michael Conway</p>
            <p>Year: 2008 &nbsp;·&nbsp; Runtime: 1 hr 32 min</p>
            <p>Location: Boston Mills / Helltown, Ohio</p>
            <p>Status: RECOVERED</p>
          </div>
        </div>
      </section>

      {/* Recovered Footage Gallery */}
      <section className="border-t border-[#0f1a0f] bg-[#030805] px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs text-[#2a5a2a] uppercase tracking-[0.5em] mb-3">
            [RECOVERED STILLS — AUTHENTICATED 06.10.2008]
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-10">
            The Last Known Footage
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
            {STILLS.map((still, i) => (
              <div key={i} className="relative group overflow-hidden bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={still.url}
                  alt={`Recovered footage still ${i + 1}`}
                  className="w-full aspect-video object-cover"
                  style={{ filter: "grayscale(40%) contrast(1.1) brightness(0.75)" }}
                />
                {/* VHS overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.08) 3px,rgba(0,0,0,0.08) 4px)" }} />
                {/* Camera UI overlay */}
                <div className="absolute inset-0 p-2 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#cc2222]" />
                      <span className="font-mono text-[9px] text-[#1a5a1a] uppercase tracking-wider">{still.label}</span>
                    </div>
                    <span className="font-mono text-[9px] text-[#1a5a1a] uppercase tracking-wider">{still.tape}</span>
                  </div>
                  <div className="font-mono text-[9px] text-[#1a5a1a] uppercase tracking-wider">
                    {still.time} · 06.09.2008
                  </div>
                </div>
                {/* Green vignette tint on hover */}
                <div className="absolute inset-0 bg-[#001a00]/0 group-hover:bg-[#001a00]/20 transition-colors" />
              </div>
            ))}
          </div>

          <p className="font-mono text-xs text-[#1a3a1a] uppercase tracking-widest mt-4 text-center">
            [END OF RECOVERED STILLS — 6 OF 6 AUTHENTICATED]
          </p>
        </div>
      </section>

      {/* Helltown lore */}
      <section className="border-t border-[#0f1a0f] relative px-6 py-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(https://res.cloudinary.com/dm7ckxbgc/image/upload/w_1920,q_auto,e_grayscale/v1784578389/Triple_cross_rkj258.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.2) contrast(1.3)",
          }}
        />
        <div className="absolute inset-0 bg-[#000a00]/80" />
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="font-mono text-xs text-[#2a5a2a] uppercase tracking-[0.5em] mb-3">
            [LOCATION DATA — CLASSIFIED]
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-8">
            Helltown, Ohio.<br />
            <span className="text-[#888]">It&apos;s a Real Place.</span>
          </h2>
          <div className="space-y-5 text-[#777] leading-relaxed text-base font-mono">
            <p>
              Boston Township — known to locals as Helltown — sits in the heart of the
              Cuyahoga Valley in Summit County, Ohio. In the 1970s, the federal government
              forced residents out overnight for a national park. The abandoned homes,
              empty churches, and overgrown roads have fueled decades of legend.
            </p>
            <p>
              Locals warn outsiders to stay away.
            </p>
          </div>
          <div className="mt-8 border border-[#cc2222]/30 bg-[#cc2222]/5 p-6">
            <p className="text-white font-black text-2xl tracking-wide text-center uppercase">
              &ldquo;Leave now. Go fast. Never return.&rdquo;
            </p>
          </div>
          <p className="font-mono text-xs text-[#555] mt-6 uppercase tracking-widest">
            Derek Boggman and his friends didn&apos;t listen.
          </p>
        </div>
      </section>

      {/* Complete Bundle */}
      <section className="border-t border-[#0f1a0f] bg-[#030805] px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs text-[#2a5a2a] uppercase tracking-[0.5em] mb-3">
            [EVIDENCE ARCHIVE — COMPLETE]
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-4">
            One Purchase.<br />
            <span className="text-[#cc2222]">11 Videos.</span>
          </h2>
          <p className="text-[#666] text-base leading-relaxed mb-10 font-mono text-sm">
            The full film plus every piece of behind-the-scenes content ever
            produced for June 9 — never before available in one place.
          </p>

          <div className="border border-[#0f1a0f] mb-10">
            {BUNDLE_CONTENTS.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-4 py-3 border-b border-[#0a150a] last:border-b-0 ${
                  item.main ? "bg-[#cc2222]/8" : "bg-[#030805]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] text-[#1a3a1a] w-5">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`font-mono text-xs uppercase tracking-wide ${item.main ? "text-[#ff6666]" : "text-[#aaa]"}`}>
                    {item.label}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#2a4a2a] hidden sm:block text-right max-w-[200px]">
                  {item.note}
                </span>
              </div>
            ))}
          </div>

          {film && (
            <a href={JUNE9_URL} className="group block border border-[#cc2222]/60 hover:border-[#cc2222] bg-[#cc2222]/5 hover:bg-[#cc2222]/10 transition-all p-8 text-center">
              <p className="font-mono text-xs text-[#555] uppercase tracking-widest mb-3">Complete Collection</p>
              <p className="text-6xl font-black text-[#cc2222] mb-4">{formatPrice(film.purchasePrice)}</p>
              <ul className="space-y-2 mb-6 font-mono text-xs text-[#666] uppercase tracking-widest">
                <li>✓ &nbsp;June 9 feature + 10 bonus videos</li>
                <li>✓ &nbsp;Permanent streaming access</li>
                <li>✓ &nbsp;Watch on any device, anytime</li>
                <li>✓ &nbsp;Secure checkout via Stripe</li>
              </ul>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#cc2222] group-hover:underline">
                Get Instant Access →
              </p>
            </a>
          )}

          {!film && (
            <div className="border border-[#0f1a0f] p-8 text-center">
              <p className="font-mono text-xs text-[#2a5a2a] uppercase tracking-widest mb-2">Loading evidence archive...</p>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-[#0f1a0f] px-6 py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, #0a0800 0%, #050505 100%)" }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="font-mono text-xs text-[#2a5a2a] uppercase tracking-[0.5em] mb-6">
            [TRANSMISSION ENDS]
          </p>
          <h2 className="text-6xl font-black uppercase tracking-tight text-white mb-2">
            JUNE <span className="text-[#cc2222]">9</span>
          </h2>
          <p className="font-mono text-xs text-[#cc2222] uppercase tracking-widest mb-8">
            The first scream was for fun. The second scream was for help.
          </p>
          {film && (
            <a href={JUNE9_URL} className="inline-block bg-[#cc2222] text-white px-12 py-5 hover:bg-[#dd3333] transition-colors font-mono text-xs uppercase tracking-widest">
              Stream the Complete Collection →
            </a>
          )}
        </div>
      </section>

      {/* Sticky bar */}
      {film && (
        <StickyBar purchasePrice={formatPrice(film.purchasePrice)} href={JUNE9_URL} />
      )}

      {/* Footer */}
      <footer className="border-t border-[#0f1a0f] px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-[#1a2a1a] uppercase tracking-widest">
            © {new Date().getFullYear()} HelltownOhio.com
          </p>
          <p className="font-mono text-xs text-[#1a2a1a] uppercase tracking-widest">
            Streaming via{" "}
            <a href="https://www.truefoundmovies.com" className="text-[#2a4a2a] hover:text-[#4a7a4a] transition-colors">
              TrueFoundMovies.com
            </a>
          </p>
        </div>
      </footer>

    </div>
  )
}
