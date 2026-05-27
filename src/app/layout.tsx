import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "True Found — Independent Films",
  description: "Stream, rent, or own handpicked independent films.",
  openGraph: {
    siteName: "True Found",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#0d0d0d] text-[#f0f0f0]">
        {children}
      </body>
    </html>
  )
}
