// app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import StructuredData from "./(seo)/structured-data";
import Header from "./components/ui/header";
import Footer from "./components/ui/footer";
import PageTransition from "./components/ui/PageTransition.client"; // si no existe, borra la línea y usa {children}

export const metadata: Metadata = {
  title: "Òrbita Events",
  description: "Producció d’esdeveniments, so i llum",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <StructuredData />
      </head>
      <body className="min-h-dvh bg-black text-white antialiased">
        <Suspense fallback={null}>
          <Header />
        </Suspense>

        <Suspense fallback={null}>
          {/* Si no tienes PageTransition, sustituye todo el bloque por: {children} */}
          <PageTransition>{children}</PageTransition>
        </Suspense>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
