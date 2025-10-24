import "./globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export const metadata = {
  title: "Òrbita Events",
  description: "Producció d’esdeveniments, DJ i tècnica",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ca">
      <body className="min-h-screen bg-primari text-secundari">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
