// app/layout.tsx
import "./globals.css";
import "./tokens.css";

import type { Metadata, Viewport } from "next";
import StructuredData from "./(seo)/structured-data";
import Header from "./components/ui/header";
import Footer from "./components/ui/footer";
import PageTransition from "./components/ui/PageTransition.client";

export const metadata: Metadata = {
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
    <html lang="es">
      <head>
        <StructuredData />
        {/* Cortafuegos inline para ocultar el layout y, específicamente, el planeta del HERO durante el splash */}
        <style id="splash-guard">{`
          .oe-splash-active body > * { visibility: hidden !important; }
          .oe-splash-active #__next,
          .oe-splash-active body { background:#000 !important; }
          .oe-splash-active [data-hero-planet],
          .oe-splash-active .hero-planet,
          .oe-splash-active .planet-bg {
            opacity:0 !important; visibility:hidden !important; transition:none !important;
          }
        `}</style>
      </head>
      <body className="min-h-dvh bg-black text-white antialiased">
        <Header />

        {/* Si no quieres PageTransition, usa directamente {children} */}
        <main id="content" className="relative z-[1] pt-28 md:pt-32">
          <PageTransition>{children}</PageTransition>
        </main>

        <Footer />

        <a
          href="/"
          aria-label="Inicio"
          className="fixed right-4 bottom-4 z-[1200] grid h-12 w-12 place-items-center
                     rounded-full border border-white/20
                     bg-white/5 backdrop-blur
                     transition-transform hover:scale-105"
        >
          <span className="text-[22px] leading-none">🪐</span>
        </a>
      </body>
    </html>
  );
}
