import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata = { title: "Order Confirmed — True Found" }

export default function CheckoutSuccessPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-sm">
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-2xl font-black uppercase tracking-widest">TRUE</span>
            <span className="text-2xl text-[#555]">»</span>
            <span className="text-2xl font-black uppercase tracking-widest">FOUND</span>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight mb-4">
            You&rsquo;re all set
          </h1>
          <p className="text-[#888] text-sm leading-relaxed mb-2">
            Your watch link is on its way to your inbox.
          </p>
          <p className="text-[#555] text-xs mb-10">
            Check your spam folder if it doesn&rsquo;t arrive within a few minutes.
          </p>
          <Link
            href="/films"
            className="text-xs uppercase tracking-widest text-[#555] hover:text-white transition-colors"
          >
            ← Browse more films
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
