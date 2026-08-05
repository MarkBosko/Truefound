import { Rubik_Distressed } from "next/font/google"
import { prisma } from "@/lib/db"
import { formatPrice } from "@/lib/stripe"
import J9Effects from "./J9Effects"
import StickyBar from "./StickyBar"

export const revalidate = 60

const rubik = Rubik_Distressed({ weight: "400", subsets: ["latin"], display: "swap" })

export const metadata = {
  title: "June 9 — The Complete Collection | HelltownOhio.com",
  description:
    "The Boston Mills 5 went into Helltown with cameras. Only the cameras came out. Stream the complete June 9 collection — the feature film + 10 bonus videos.",
}

const JUNE9_SLUG = "june-9"
const JUNE9_URL = `https://www.truefoundmovies.com/films/${JUNE9_SLUG}`

const STILLS = [
  { cloudId: "v1784578387/BM_Sign_osf4vg",       tape: "BM5-001", time: "00:04:12" },
  { cloudId: "v1784578388/Kids_s3ekqg",           tape: "BM5-002", time: "00:18:47" },
  { cloudId: "v1784578389/Triple_cross_rkj258",   tape: "BM5-003", time: "00:31:05" },
  { cloudId: "v1784578388/Pig_stall_d5cv4i",      tape: "BM5-004", time: "00:52:33" },
  { cloudId: "v1784578390/Upside_down_qfs4ay",    tape: "BM5-005", time: "01:09:58" },
  { cloudId: "v1784578389/Statues_jgsvhn",         tape: "BM5-006", time: "01:27:41" },
]

const MANIFEST = [
  { num: "01", title: "June 9 — Feature Film",       note: "The recovered footage, compiled in full",  hero: true  },
  { num: "02", title: "Director Commentary",          note: "T. Michael Conway on the cut"                         },
  { num: "03", title: "Auditions",                   note: "Casting the Boston Mills 5"                            },
  { num: "04", title: "Deleted Scenes",              note: "Cut from the final assembly"                           },
  { num: "05", title: "Original Opening / Ending",   note: "Alternate bookends"                                    },
  { num: "06", title: "Helltown: Making June 9",     note: "Behind-the-scenes documentary"                         },
  { num: "07", title: "Key Art Concepts",            note: "Poster & cover explorations"                           },
  { num: "08", title: "Streaming Ad",                note: "Broadcast promo spot"                                  },
  { num: "09", title: "Promotional 2025",            note: "Re-release campaign"                                   },
  { num: "10", title: "Promotional 2026",            note: "Anniversary campaign"                                  },
  { num: "11", title: "Trailer",                     note: "Theatrical trailer"                                    },
]

const NOISE_SVG = `url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')`

const SCANLINES = "repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0) 4px)"

const j9CSS = `
  .j9-page { background: #030303; color: #DDD9CE; -webkit-font-smoothing: antialiased; font-family: Georgia,'Times New Roman',serif; }
  .j9-page a { color: #9A9688; text-decoration: none; transition: color .2s; }
  .j9-page a:hover { color: #C79A3A; }
  .j9-page ::selection { background: #C79A3A; color: #030303; }
  .j9-btn { background: #C79A3A; color: #030303; border: 1px solid #E3B856; transition: background .2s; cursor: pointer; }
  .j9-btn:hover { background: #E3B856; }
  .j9-btn-white { background: #DDD9CE; color: #030303; border: 1px solid #fff; transition: background .2s; cursor: pointer; }
  .j9-btn-white:hover { background: #fff; }
  @keyframes recBlink { 0%,49%{opacity:1}50%,100%{opacity:0.1} }
  .j9-rec { animation: recBlink 1.4s steps(1) infinite; }
  .j9-glitch { position: relative; display: inline-block; }
  .j9-glitch::before,.j9-glitch::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; pointer-events: none; mix-blend-mode: screen; }
  .j9-glitch::before { color: #ff2020; animation: j9GlitchRed 7s steps(1) infinite; }
  .j9-glitch::after  { color: #00ffee; animation: j9GlitchCyan 7s steps(1) infinite; }
  @keyframes j9GlitchRed {
    0%,90%,100%{clip-path:inset(100% 0 0 0);transform:translateX(0)}
    91%{clip-path:inset(12% 0 66% 0);transform:translateX(-5px)}
    93%{clip-path:inset(58% 0 22% 0);transform:translateX(5px)}
    95%{clip-path:inset(38% 0 44% 0);transform:translateX(-3px)}
    97%{clip-path:inset(74% 0 8% 0);transform:translateX(4px)}
    99%{clip-path:inset(24% 0 60% 0);transform:translateX(-4px)}
  }
  @keyframes j9GlitchCyan {
    0%,90%,100%{clip-path:inset(100% 0 0 0);transform:translateX(0)}
    91%{clip-path:inset(66% 0 12% 0);transform:translateX(5px)}
    93%{clip-path:inset(22% 0 58% 0);transform:translateX(-5px)}
    95%{clip-path:inset(44% 0 38% 0);transform:translateX(3px)}
    97%{clip-path:inset(8% 0 74% 0);transform:translateX(-4px)}
    99%{clip-path:inset(60% 0 24% 0);transform:translateX(4px)}
  }
  .j9-reveal { opacity: 0; transform: translateY(22px); transition: opacity .9s ease, transform .9s ease; }
  .j9-reveal.j9-in { opacity: 1; transform: none; }
  @media (max-width: 820px) {
    .j9-story { grid-template-columns: 1fr !important; gap: 40px !important; }
    .j9-stills { grid-template-columns: repeat(2,1fr) !important; }
    .j9-camdata,.j9-review { display: none !important; }
    .j9-note { display: none !important; }
    .j9-ctablock { grid-template-columns: 1fr !important; gap: 28px !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    .j9-glitch::before,.j9-glitch::after { animation: none !important; display: none; }
    #j9-grain { display: none !important; }
    .j9-reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
    .j9-rec { animation: none !important; opacity: 1 !important; }
  }
`

async function getFilm() {
  return prisma.film.findFirst({ where: { slug: JUNE9_SLUG, active: true } })
}

function cloudUrl(id: string, w = 800) {
  return `https://res.cloudinary.com/dm7ckxbgc/image/upload/w_${w},q_auto/${id}.jpg`
}

export default async function HelltownOhioPage() {
  const film = await getFilm()
  const price = film ? formatPrice(film.purchasePrice) : "$9.99"

  return (
    <div className="j9-page" style={{ position: "relative", width: "100%", overflowX: "hidden" }}>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: j9CSS }} />

      {/* Film grain canvas */}
      <canvas
        id="j9-grain"
        style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 9998, pointerEvents: "none", opacity: 0.035, mixBlendMode: "screen" }}
      />

      {/* Scanline overlay */}
      <div style={{ position: "fixed", inset: 0, zIndex: 9997, pointerEvents: "none", backgroundImage: SCANLINES }} />

      {/* ── NAV ── */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 28px", background: "linear-gradient(to bottom, rgba(3,3,3,0.92), rgba(3,3,3,0))", fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, color: "rgba(120,196,92,0.95)" }}>
          <span className="j9-rec" style={{ display: "inline-block", width: 9, height: 9, borderRadius: "50%", background: "#C79A3A" }} />
          <span>REC 06.09.2008 14:32:07</span>
        </div>
        <a href="https://www.truefoundmovies.com" style={{ color: "#7A7566", letterSpacing: 1 }}>TrueFoundMovies.com</a>
      </div>

      {/* ── HERO ── */}
      <div style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "120px 24px 80px",
        backgroundImage: `linear-gradient(180deg, rgba(3,3,3,0.55) 0%, rgba(3,3,3,0.25) 35%, rgba(3,3,3,0.55) 78%, #030303 100%), url(${cloudUrl("v1784578389/Triple_cross_rkj258", 1920)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        {/* Corner markers */}
        <div style={{ position: "absolute", top: 26, left: 28, width: 46, height: 46, borderLeft: "2px solid rgba(42,94,28,0.75)", borderTop: "2px solid rgba(42,94,28,0.75)" }} />
        <div style={{ position: "absolute", top: 26, right: 28, width: 46, height: 46, borderRight: "2px solid rgba(42,94,28,0.75)", borderTop: "2px solid rgba(42,94,28,0.75)" }} />
        <div style={{ position: "absolute", bottom: 26, left: 28, width: 46, height: 46, borderLeft: "2px solid rgba(42,94,28,0.75)", borderBottom: "2px solid rgba(42,94,28,0.75)" }} />
        <div style={{ position: "absolute", bottom: 26, right: 28, width: 46, height: 46, borderRight: "2px solid rgba(42,94,28,0.75)", borderBottom: "2px solid rgba(42,94,28,0.75)" }} />

        {/* Camera data overlays */}
        <div className="j9-camdata" style={{ position: "absolute", top: 70, left: 40, textAlign: "left", fontFamily: "'Courier New', monospace", fontSize: 11, lineHeight: 1.8, color: "rgba(120,196,92,0.9)", letterSpacing: 1 }}>
          <div>[ REC ● ]</div>
          <div>DATE 06.09.2008</div>
          <div>TAPE BM5-004</div>
          <div>BATT ▮▮▮▯ 61%</div>
        </div>
        <div className="j9-camdata" style={{ position: "absolute", top: 70, right: 40, textAlign: "right", fontFamily: "'Courier New', monospace", fontSize: 11, lineHeight: 1.8, color: "rgba(120,196,92,0.9)", letterSpacing: 1 }}>
          <div>GPS 41.2361° N</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;81.5570° W</div>
          <div>NIGHT MODE ON</div>
        </div>

        {/* Hero content */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: 780, width: "100%", margin: "0 auto" }}>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: 3, color: "#C79A3A", textTransform: "uppercase", marginBottom: 22, textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}>
            Recovered Footage — Summit County, Ohio
          </div>

          <h1
            className={`j9-glitch ${rubik.className}`}
            data-text="june 9"
            style={{ fontWeight: 400, fontSize: "clamp(64px, 11vw, 150px)", lineHeight: 0.92, letterSpacing: 0, margin: 0, color: "#DDD9CE", textTransform: "lowercase", textShadow: "0 4px 24px rgba(0,0,0,0.7)" }}
          >
            june <span style={{ color: "#C79A3A" }}>9</span>
          </h1>

          <div style={{ fontFamily: "'Courier New', monospace", fontSize: "clamp(13px, 1.6vw, 17px)", color: "#C79A3A", letterSpacing: 1, marginTop: 30, maxWidth: 560, textShadow: "0 2px 12px rgba(0,0,0,0.85)" }}>
            The first scream was for fun. The second scream was for help.
          </div>

          <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(16px, 1.8vw, 20px)", lineHeight: 1.6, color: "#DDD9CE", maxWidth: 540, margin: "22px auto 0", textShadow: "0 2px 12px rgba(0,0,0,0.85)" }}>
            The Boston Mills 5 went into Helltown with cameras.<br />
            <em style={{ color: "#fff" }}>Only the cameras came out.</em>
          </p>

          <a href={`#bundle`} className="j9-btn" style={{ display: "inline-block", marginTop: 36, padding: "17px 40px", fontFamily: "Impact, sans-serif", fontSize: 20, letterSpacing: 1.5, textTransform: "uppercase" }}>
            Own the Complete Collection
          </a>

          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#9A9688", letterSpacing: 1, marginTop: 16, textShadow: "0 2px 12px rgba(0,0,0,0.85)" }}>
            11 videos · one-time purchase · permanent access
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 30, left: 40, fontFamily: "'Courier New', monospace", fontSize: 11, color: "#7A7566", letterSpacing: 2 }}>
          ↓ SCROLL TO REVIEW EVIDENCE
        </div>

        {/* Review quote */}
        <div className="j9-review" style={{ position: "absolute", bottom: 30, right: 40, maxWidth: 260, textAlign: "right", fontFamily: "'Courier New', monospace", fontSize: 11, lineHeight: 1.6, color: "#9A9688" }}>
          &ldquo;A genuinely unnerving descent into the woods.&rdquo;<br />
          <span style={{ color: "#7A7566" }}>— Film Threat</span>
        </div>
      </div>

      {/* ── EVIDENCE HEADER STRIP ── */}
      <div style={{ borderTop: "2px solid #C79A3A", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 8, padding: "12px 28px", background: "#0d0c0a", fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: 1 }}>
        <div style={{ color: "rgba(120,196,92,0.95)" }}>▌ Evidence Archive — Case File 06.09.2008 — Boston Mills, OH</div>
        <div style={{ color: "#7A7566" }}>DIR. T. MICHAEL CONWAY · 2008 · 1:32:00 · STATUS: UNRESOLVED</div>
      </div>

      {/* ── TWO-COLUMN STORY ── */}
      <div
        className="j9-story j9-reveal"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, maxWidth: 1180, margin: "0 auto", padding: "100px 40px" }}
      >
        {/* Pull quote */}
        <div>
          <blockquote style={{ margin: 0, paddingLeft: 26, borderLeft: "3px solid #C79A3A", fontFamily: "Impact, sans-serif", fontWeight: 400, fontSize: "clamp(38px, 5vw, 68px)", lineHeight: 0.98, letterSpacing: -1, color: "#DDD9CE", textTransform: "uppercase" }}>
            Leave now.<br />Go fast.<br />Never return.
          </blockquote>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#7A7566", letterSpacing: 1, marginTop: 22, paddingLeft: 26 }}>
            — Sign posted at the Boston Township boundary, undated
          </div>
        </div>

        {/* Incident report */}
        <div>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: 2, color: "rgba(120,196,92,0.95)", textTransform: "uppercase", marginBottom: 20 }}>
            Incident Report
          </div>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 17, lineHeight: 1.75, color: "#DDD9CE", margin: "0 0 18px" }}>
            On the ninth of June, 2008, five teenagers drove into the ruins of Boston Mills carrying three consumer camcorders and a fourth camera never accounted for. They intended to spend one night filming the local legends — the Crybaby Bridge, the abandoned school bus, the peeling houses left standing where a town used to be.
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 17, lineHeight: 1.75, color: "#9A9688", margin: "0 0 30px" }}>
            None of the five were seen again. Eleven days later, a county surveyor recovered the cameras from the treeline. The footage on them has been authenticated and compiled here in full.
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Courier New', monospace", fontSize: 12 }}>
            <tbody>
              {[
                ["DIRECTOR",  "T. Michael Conway"],
                ["LOCATION",  "Boston Mills, Summit Co., OH"],
                ["YEAR",      "2008"],
                ["RUNTIME",   "1 hr 32 min"],
                ["FORMAT",    "Recovered digital / VHS transfer"],
                ["STATUS",    "Unresolved", true],
              ].map(([label, value, amber]) => (
                <tr key={label as string}>
                  <td style={{ padding: "9px 12px", border: "1px solid #1c1a16", color: "#7A7566", width: "40%" }}>{label}</td>
                  <td style={{ padding: "9px 12px", border: "1px solid #1c1a16", color: amber ? "#C79A3A" : "#DDD9CE" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── STILLS ── */}
      <div style={{ background: "#0d0c0a", padding: "90px 40px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: 12, maxWidth: 1180, margin: "0 auto 40px" }}>
          <h2 style={{ fontFamily: "Impact, sans-serif", fontWeight: 400, fontSize: "clamp(34px, 5vw, 64px)", letterSpacing: -1, margin: 0, color: "#DDD9CE", textTransform: "uppercase" }}>The Last Known Footage</h2>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#7A7566", letterSpacing: 1 }}>6 STILLS AUTHENTICATED</div>
        </div>

        <div className="j9-stills" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, maxWidth: 1180, margin: "0 auto" }}>
          {STILLS.map((still) => (
            <div key={still.tape} className="j9-reveal" style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", border: "1px solid #1c1a16", background: "#0a0906" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cloudUrl(still.cloudId)}
                alt={`Recovered still ${still.tape}`}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.72) contrast(1.08) brightness(0.82)" }}
              />
              {/* Gradient overlay */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(3,3,3,0.28), rgba(3,3,3,0.12) 40%, rgba(3,3,3,0.55))" }} />
              {/* Fractal noise */}
              <div style={{ position: "absolute", inset: 0, opacity: 0.35, mixBlendMode: "overlay", backgroundImage: NOISE_SVG }} />
              {/* Scanlines */}
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,0) 2px, rgba(0,0,0,0.28) 3px, rgba(0,0,0,0) 4px)" }} />
              {/* VHS chrome — top */}
              <div style={{ position: "absolute", top: 10, left: 10, right: 10, display: "flex", justifyContent: "space-between", fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: 1, color: "rgba(120,196,92,0.92)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#C79A3A", display: "inline-block" }} />
                  REC
                </span>
                <span>{still.tape}</span>
              </div>
              {/* VHS chrome — bottom */}
              <div style={{ position: "absolute", bottom: 10, left: 10, right: 10, textAlign: "right", fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: 1, color: "rgba(120,196,92,0.92)" }}>
                {still.time}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", fontFamily: "'Courier New', monospace", fontSize: 11, color: "#7A7566", letterSpacing: 1, marginTop: 34 }}>
          [ End of recovered stills — 6 of 6 authenticated ]
        </div>
      </div>

      {/* ── HELLTOWN ── */}
      <div style={{ padding: "110px 40px", background: "radial-gradient(ellipse 60% 50% at 20% 40%, rgba(42,94,28,0.14), transparent 60%), #030303" }}>
        <div className="j9-reveal" style={{ maxWidth: 620, margin: "0 auto 0 max(40px, calc(50% - 590px))" }}>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: 2, color: "rgba(120,196,92,0.95)", textTransform: "uppercase", marginBottom: 18 }}>
            The Location Is Real
          </div>
          <h2 style={{ fontFamily: "Impact, sans-serif", fontWeight: 400, fontSize: "clamp(56px, 9vw, 128px)", lineHeight: 0.86, letterSpacing: -2, margin: 0, color: "#DDD9CE", textTransform: "uppercase" }}>
            Helltown,<br />Ohio.
          </h2>
          <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "clamp(18px, 2.4vw, 26px)", color: "#C79A3A", margin: "18px 0 34px" }}>
            It&apos;s a real place.
          </div>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 17, lineHeight: 1.75, color: "#DDD9CE", margin: "0 0 18px" }}>
            In the mid-1970s the federal government bought out the entire village of Boston Township for a national recreation area. Families were given weeks to leave. Overnight, a living town became a grid of empty houses, a shuttered school, a church with its doors left open.
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 17, lineHeight: 1.75, color: "#9A9688", margin: "0 0 40px" }}>
            The demolitions stalled. The people never came back. And the stories that grew up in the vacuum — of a mutated congregation, of headlights that follow you, of something in the trees on Stanford Road — outlived every family that was forced out. The locals stopped calling it Boston Mills. They started calling it Helltown.
          </p>
          <div style={{ border: "1px solid #C79A3A", padding: "26px 30px", background: "rgba(199,154,58,0.07)" }}>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: 2, color: "#C79A3A", textTransform: "uppercase", marginBottom: 16 }}>
              ⚠ Posted at township boundary
            </div>
            <div style={{ fontFamily: "Impact, sans-serif", fontWeight: 400, fontSize: "clamp(34px, 5.5vw, 58px)", lineHeight: 0.98, letterSpacing: -1, color: "#DDD9CE", textTransform: "uppercase" }}>
              Leave now.<br />Go fast.<br />Never return.
            </div>
          </div>
        </div>
      </div>

      {/* ── BUNDLE ── */}
      <div id="bundle" style={{ background: "#0d0c0a", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Impact, sans-serif", fontWeight: 400, fontSize: "clamp(48px, 8vw, 108px)", lineHeight: 0.86, letterSpacing: -2, margin: 0, color: "#DDD9CE", textTransform: "uppercase" }}>
            One Purchase.
          </h2>
          <div style={{ fontFamily: "Impact, sans-serif", fontWeight: 400, fontSize: "clamp(30px, 5vw, 64px)", letterSpacing: -1, color: "#C79A3A", textTransform: "uppercase", marginTop: 4 }}>
            11 Videos. All of it.
          </div>
        </div>

        <div className="j9-reveal" style={{ maxWidth: 1000, margin: "54px auto 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Courier New', monospace", fontSize: 13 }}>
            <thead>
              <tr style={{ color: "#7A7566", textAlign: "left" }}>
                <th style={{ padding: "10px 14px", borderBottom: "1px solid #1c1a16", fontWeight: 400, width: 44 }}>#</th>
                <th style={{ padding: "10px 14px", borderBottom: "1px solid #1c1a16", fontWeight: 400 }}>TITLE</th>
                <th className="j9-note" style={{ padding: "10px 14px", borderBottom: "1px solid #1c1a16", fontWeight: 400 }}>NOTE</th>
                <th style={{ padding: "10px 14px", borderBottom: "1px solid #1c1a16", fontWeight: 400, textAlign: "right" }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {MANIFEST.map((row) => (
                <tr key={row.num} style={row.hero ? { background: "rgba(199,154,58,0.10)" } : {}}>
                  <td style={{ padding: "11px 14px", borderBottom: "1px solid #131210", color: "#7A7566" }}>{row.num}</td>
                  <td style={{ padding: "11px 14px", borderBottom: "1px solid #131210", color: row.hero ? "#C79A3A" : "#DDD9CE", fontWeight: row.hero ? "bold" : "normal" }}>{row.title}</td>
                  <td className="j9-note" style={{ padding: "11px 14px", borderBottom: "1px solid #131210", color: "#9A9688" }}>{row.note}</td>
                  <td style={{ padding: "11px 14px", borderBottom: "1px solid #131210", textAlign: "right", color: "#3fbf34", letterSpacing: 1 }}>● INCLUDED</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* CTA block */}
          <div className="j9-ctablock" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", border: "1px solid #C79A3A", marginTop: 40, padding: 40, background: "rgba(199,154,58,0.06)" }}>
            <div>
              <div style={{ fontFamily: "Impact, sans-serif", fontWeight: 400, fontSize: 72, lineHeight: 1, color: "#DDD9CE" }}>{price}</div>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, letterSpacing: 2, color: "#C79A3A", textTransform: "uppercase", marginTop: 8 }}>Complete Collection</div>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#7A7566", letterSpacing: 1, marginTop: 6 }}>One-time purchase · Permanent access</div>
            </div>
            <div>
              <ul style={{ listStyle: "none", margin: "0 0 24px", padding: 0, fontFamily: "'Courier New', monospace", fontSize: 13, lineHeight: 2.1, color: "#9A9688" }}>
                <li>✓ All 11 videos, 4+ hours</li>
                <li>✓ The feature film in full</li>
                <li>✓ Director commentary &amp; extras</li>
                <li>✓ Stream anywhere, forever</li>
              </ul>
              <a href={JUNE9_URL} className="j9-btn" style={{ display: "inline-block", padding: "16px 34px", fontFamily: "Impact, sans-serif", fontSize: 19, letterSpacing: 1, textTransform: "uppercase" }}>
                Get Instant Access →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <div style={{ background: "#C79A3A", padding: "120px 40px", textAlign: "center" }}>
        <h2
          className={rubik.className}
          style={{ fontWeight: 400, fontSize: "clamp(72px, 13vw, 170px)", lineHeight: 0.86, letterSpacing: 0, margin: 0, color: "#030303", textTransform: "lowercase" }}
        >
          june<br />9
        </h2>
        <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, letterSpacing: 2, color: "rgba(255,255,255,0.7)", margin: "30px 0 36px" }}>
          SOME FOOTAGE WAS NEVER MEANT TO BE SEEN. NOW YOU CAN.
        </div>
        <a href={JUNE9_URL} className="j9-btn-white" style={{ display: "inline-block", padding: "18px 42px", fontFamily: "Impact, sans-serif", fontSize: 21, letterSpacing: 1.5, textTransform: "uppercase" }}>
          Stream the Complete Collection
        </a>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ background: "#030303", padding: "26px 28px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: 1, color: "#7A7566" }}>
        <div>© 2026 HelltownOhio.com</div>
        <div>Streaming via <a href="https://www.truefoundmovies.com">TrueFoundMovies.com</a></div>
      </div>

      <J9Effects />
      {film && <StickyBar purchasePrice={price} href={JUNE9_URL} />}
    </div>
  )
}
