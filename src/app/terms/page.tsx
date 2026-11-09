import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Terms of Service | TrueFoundMovies",
  description: "Terms of service for TrueFoundMovies streaming platform.",
}

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0d0d0d] text-white">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#555] mb-3">Legal</p>
          <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Terms of Service</h1>
          <p className="text-xs text-[#555] mb-12">Last updated: November 2026</p>

          <div className="prose-dark space-y-10 text-[#aaa] text-sm leading-relaxed">

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using TrueFoundMovies.com you agree to be bound by these Terms of Service. If you do not agree, do not use the site.</p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-3">2. The Service</h2>
              <p>TrueFoundMovies provides on-demand streaming access to documentary films. Films are available for rental (48-hour access), purchase (permanent access), or free viewing through the TrueFound Vault collection. Access is personal and non-transferable.</p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-3">3. Watch Links</h2>
              <p>After completing a rental, purchase, or free access request, a unique watch link is emailed to you. Keep this email — it is your key to access the film. TrueFoundMovies is not responsible for watch links sent to an incorrect email address provided at checkout.</p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-3">4. Rentals</h2>
              <p>Rental access begins at the time the watch link is delivered and expires 48 hours later. Unused rental time is not refunded or extended.</p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-3">5. Purchases</h2>
              <p>Purchased films grant permanent streaming access via your watch link. TrueFoundMovies reserves the right to remove a title from the platform in the event of a licensing change; in such cases, affected customers will be notified and offered a comparable remedy.</p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-3">6. TrueFound Vault</h2>
              <p>Films in the TrueFound Vault collection are provided free of charge for personal viewing. No subscription or payment is required. These films may not be downloaded, redistributed, or broadcast.</p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-3">7. Payments</h2>
              <p>All payments are processed securely by Stripe. TrueFoundMovies does not store your payment card information. Prices are listed in US dollars.</p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-3">8. Refund Policy</h2>
              <p>All sales are final. We do not offer refunds on rentals or purchases once a watch link has been delivered. If you experience a technical issue preventing you from watching a film you paid for, contact us and we will make it right.</p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-3">9. Prohibited Use</h2>
              <p>You may not download, record, copy, redistribute, resell, broadcast, or publicly display any film accessed through TrueFoundMovies. All content is licensed for personal, non-commercial viewing only.</p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-3">10. Disclaimer of Warranties</h2>
              <p>The service is provided &ldquo;as is&rdquo; without warranty of any kind. We do not guarantee uninterrupted or error-free streaming. TrueFoundMovies is not responsible for internet connectivity issues or device compatibility on your end.</p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-3">11. Changes to Terms</h2>
              <p>We may update these terms at any time. Continued use of the site after changes are posted constitutes acceptance of the updated terms.</p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-3">12. Contact</h2>
              <p>Questions about these terms? Email us at <span className="text-white">support@truefoundmovies.com</span>.</p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
