// app/layout.tsx
import "./globals.css";
import "./tokens.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import LocalBusinessJsonLD from "@/app/(seo)/structured-data";
import Header from "@/app/components/ui/header";
import Footer from "@/app/components/ui/footer";

// Fuente
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

// Transición global en cliente (opcional)
const PageTransition = dynamic(
  () => import("@/app/components/ui/PageTransition.client"),
  { ssr: false }
);

// Config base para metadatos absolutos
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://orbitaevents-prova.vercel.app";

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  title: { default: "Òrbita Events", template: "%s | Òrbita Events" },
  description:
    "Discomóvil y DJs para bodas y fiestas. Sonido, iluminación y animación con criterio.",
  applicationName: "Òrbita Events",
  metadataBase: new URL(siteUrl),

  alternates: {
    canonical: "/",
    languages: { "es-ES": "/", "ca-ES": "/ca" }
  },

  manifest: "/manifest.webmanifest",

  icons: {
    icon: [
      { url: "/img/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" }
    ],
    apple: [{ url: "/apple-touch-icon.png" }]
  },

  openGraph: {
    title: "Òrbita Events — Técnica, música y emoción",
    description:
      "DJ, sonido e iluminación para bodas, fiestas y eventos en Barcelona y Catalunya.",
    url: "/",
    siteName: "Òrbita Events",
    images: [{ url: "/img/og-orbita.jpg" }],
    locale: "es_ES",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "Òrbita Events — Técnica, música y emoción",
    description:
      "DJ, sonido e iluminación para bodas, fiestas y eventos en Barcelona y Catalunya.",
    images: ["/img/og-orbita.jpg"],
    creator: "@orbitaevents"
  },

  creator: "Òrbita Events",
  publisher: "Òrbita Events",

  other: {
    "google-site-verification": "PASTE_REAL_TOKEN_HERE"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preconexión a fuentes */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>

      <body
        className={`${inter.variable} font-sans relative min-h-dvh bg-main text-white antialiased selection:bg-[#d7b86e]/25`}
      >
        <Header />

        <main id="content" className="relative z-[1] pt-16 md:pt-20 lg:pt-24">
          <PageTransition>{children}</PageTransition>
        </main>

        <Footer />

        {/* SEO estructurado */}
        <LocalBusinessJsonLD />

        {/* Botón Home flotante */}
        <a
          href="/"
          aria-label="Inicio"
          data-planet-home
          className="fixed right-4 bottom-4 z-[1200] grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-transform hover:scale-105"
        >
          <span className="text-[22px] leading-none">🪐</span>
        </a>
      </body>
    </html>
  );
}
