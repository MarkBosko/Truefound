import { prisma } from "@/lib/db"
import { formatPrice } from "@/lib/stripe"

export const dynamic = "force-dynamic"

export const metadata = { title: "Orders — Admin" }

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { film: true },
    orderBy: { createdAt: "desc" },
  })

  const total = orders.reduce((s, o) => s + o.amountCents, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-black uppercase tracking-widest">Orders</h1>
        <p className="text-sm text-[#888]">
          Total revenue:{" "}
          <span className="text-white font-bold">{formatPrice(total)}</span>
        </p>
      </div>

      <div className="border border-[#1a1a1a] rounded overflow-hidden">
        {orders.length === 0 ? (
          <p className="text-[#555] text-sm p-6">No orders yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-[#1a1a1a]">
              <tr className="text-xs uppercase tracking-widest text-[#555]">
                <th className="text-left px-6 py-3">Date</th>
                <th className="text-left px-6 py-3">Film</th>
                <th className="text-left px-6 py-3">Email</th>
                <th className="text-center px-6 py-3">Type</th>
                <th className="text-right px-6 py-3">Amount</th>
                <th className="text-center px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const expired =
                  order.expiresAt !== null && order.expiresAt < new Date()
                return (
                  <tr key={order.id} className="border-b border-[#111] hover:bg-[#111]">
                    <td className="px-6 py-4 text-[#666] text-xs">
                      {order.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">{order.film.title}</td>
                    <td className="px-6 py-4 text-[#888]">{order.customerEmail}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-xs uppercase tracking-widest text-[#666]">
                        {order.type === "RENTAL" ? "Rental" : "Purchase"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold">
                      {formatPrice(order.amountCents)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {order.type === "PURCHASE" ? (
                        <span className="text-xs text-green-500 uppercase tracking-widest">Active</span>
                      ) : expired ? (
                        <span className="text-xs text-[#555] uppercase tracking-widest">Expired</span>
                      ) : (
                        <span className="text-xs text-green-500 uppercase tracking-widest">Active</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
