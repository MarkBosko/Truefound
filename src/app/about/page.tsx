import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata = {
  title: "About | TrueFoundMovies",
  description: "TrueFoundMovies is an independent streaming platform for documentary films about cryptids, the paranormal, and unexplained phenomena.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0d0d0d] text-white">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#555] mb-3">About</p>
          <h1 className="text-3xl font-black uppercase tracking-tight mb-10">TrueFoundMovies</h1>

          <div className="space-y-6 text-[#aaa] text-sm leading-relaxed">
            <p>
              TrueFoundMovies is an independent streaming platform dedicated to documentary films that go where mainstream media won&rsquo;t — creatures, the paranormal, unexplained phenomena, and the people who chase them.
            </p>
            <p>
              We believe the best evidence isn&rsquo;t locked in a studio vault or buried behind a cable subscription. Our library spans new releases and classic titles from the 1960s through today, all in one place.
            </p>
            <p>
              The <span className="text-white font-semibold">TrueFound Vault</span> is our free streaming collection — groundbreaking vintage documentaries from the 1960s, 70s, and 80s, available to anyone, with no subscription and no advertising. These films shaped the conversation decades before the genre went mainstream.
            </p>
            <p>
              Every film on TrueFoundMovies is here because we believe it deserves to be seen.
            </p>
          </div>

          <div className="mt-14 border-t border-[#1a1a1a] pt-10">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#555] mb-6">Contact</h2>
            <p className="text-sm text-[#aaa]">
              For licensing inquiries, support, or press: <span className="text-white">support@truefoundmovies.com</span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
