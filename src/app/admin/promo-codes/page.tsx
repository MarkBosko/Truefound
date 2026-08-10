import { prisma } from "@/lib/db"
import GenerateCodeForm from "./GenerateCodeForm"

export const dynamic = "force-dynamic"

export default async function PromoCodesPage() {
  const [films, codes] = await Promise.all([
    prisma.film.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, select: { id: true, title: true } }),
    prisma.promoCode.findMany({
      include: { film: { select: { title: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ])

  const now = new Date()

  function status(c: typeof codes[0]) {
    if (c.usedAt) return { label: "Used", color: "#666" }
    if (c.expiresAt < now) return { label: "Expired", color: "#cc4444" }
    return { label: "Active", color: "#4ade80" }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-black uppercase tracking-widest">Screener Codes</h1>
      </div>

      <GenerateCodeForm films={films} />

      <div className="border border-[#1a1a1a] rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1a1a1a]">
              {["Code", "Film", "Status", "Expires", "Used By"].map((h) => (
                <th key={h} className="text-left text-xs uppercase tracking-[0.2em] text-[#555] px-4 py-3 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {codes.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[#555] text-xs">
                  No codes yet. Generate one above.
                </td>
              </tr>
            )}
            {codes.map((c) => {
              const s = status(c)
              return (
                <tr key={c.id} className="border-b border-[#111] hover:bg-[#0d0d0d]">
                  <td className="px-4 py-3 font-mono font-bold tracking-widest text-white">{c.code}</td>
                  <td className="px-4 py-3 text-[#aaa]">{c.film.title}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: s.color }}>
                      {s.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#666] text-xs">
                    {c.expiresAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3 text-[#666] text-xs">{c.usedByEmail ?? "—"}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
