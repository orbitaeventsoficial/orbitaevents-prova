// app/layout.tsx
import "./globals.css";
import "./tokens.css";

import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import StructuredData from "./(seo)/structured-data";
import Header from "./components/ui/header";
import Footer from "./components/ui/footer";
import PageTransition from "./components/ui/PageTransition.client";

// Si defines NEXT_PUBLIC_SITE_URL en .env(.local), lo usamos.
// Si no, cae en el fallback y Next no llorará en producción.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://orbitaevents-prova.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Òrbita Events",
  description: "Producció d’esdeveniments, so i llum",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <head>
        <StructuredData />
        <style id="splash-guard">{`
          .oe-splash-active body > * { visibility: hidden !important; }
          .oe-splash-active #__next, .oe-splash-active body { background:#000 !important; }
          .oe-splash-active [data-hero-planet],
          .oe-splash-active .hero-planet,
          .oe-splash-active .planet-bg {
            opacity:0 !important; visibility:hidden !important; transition:none !important;
          }
        `}</style>
      </head>

      <body className="min-h-dvh bg-black text-white antialiased">
        <Header />

        {/* Suspense global: evita el error de build con useSearchParams en cualquier página */}
        <main id="content" className="relative z-[1] pt-28 md:pt-32">
          <Suspense fallback={null}>
            <PageTransition>{children}</PageTransition>
          </Suspense>
        </main>

        <Footer />

        {/* Botón home flotante */}
        <a
          href="/"
          aria-label="Inicio"
          className="fixed right-4 bottom-4 z-[1200] grid h-12 w-12 place-items-center
                     rounded-full border border-white/20 bg-white/5 backdrop-blur
                     transition-transform hover:scale-105"
        >
          <span className="text-[22px] leading-none">🪐</span>
        </a>
      </body>
    </html>
  );
}
