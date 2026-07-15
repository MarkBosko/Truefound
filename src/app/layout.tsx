import type { Metadata } from "next"
import { Oswald, Lato } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import "./globals.css"

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
})

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],
})

export const metadata: Metadata = {
  title: "TrueFoundMovies - Stream creature, paranormal and alien films",
  description: "TrueFoundMovies is the world's best source to stream creature, paranormal and alien found footage and documentary movies",
  metadataBase: new URL("https://www.truefoundmovies.com"),
  alternates: {
    canonical: "https://www.truefoundmovies.com",
  },
  verification: {
    google: "25bOt62ZVrbBjlGzhm8R4e5Myq2m6K3oQ2ZcP2SSrUY",
  },
  openGraph: {
    siteName: "TrueFoundMovies",
    type: "website",
    url: "https://www.truefoundmovies.com",
  },
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TrueFoundMovies",
  url: "https://www.truefoundmovies.com",
  description: "Stream creature, paranormal and alien found footage and documentary films",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${lato.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0d0d0d] text-[#f0f0f0]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
        <GoogleAnalytics gaId="G-PCY8GFF20L" />
      </body>
    </html>
  )
}
