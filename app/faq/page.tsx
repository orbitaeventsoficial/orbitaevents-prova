// app/faq/page.tsx
// 🔥 MANOLO VERSION - Optimizado para capturar leads de alta intención

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Breadcrumbs from "@/app/components/seo/Breadcrumbs";
import { FAQ_DATA } from "./faq-data";

export const metadata: Metadata = {
  title: "FAQ DJ Bodas Barcelona | Respuestas Reales Sin Rodeos | Órbita Events",
  description:
    "Precios reales, equipamiento técnico, limitadores de sonido, cancelaciones. Todo lo que nadie te cuenta ANTES de contratar. Transparencia brutal para que decidas bien.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://orbitaevents.cat"
  ),
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ DJ Bodas | Las Respuestas Que Tu Competencia Oculta",
    description: "Precios reales. Limitadores. Cancelaciones. Todo sin filtros.",
    url: "/faq",
    images: [
      {
        url: "/api/og?title=FAQ%20Respuestas%20Sin%20Filtros",
        alt: "FAQ DJ bodas Barcelona - Respuestas reales",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ DJ Bodas | Respuestas Sin Rodeos",
    description: "Precios, equipamiento, limitadores. Todo lo que necesitas saber.",
    images: ["/api/og?title=FAQ%20Transparente"],
  },
  robots: { index: true, follow: true },
  keywords: [
    "FAQ DJ bodas Barcelona",
    "preguntas frecuentes discomóvil",
    "precio DJ boda Barcelona",
    "limitador sonido boda",
    "cancelación evento DJ",
    "equipamiento DJ profesional",
    "alquiler sonido luces Barcelona",
  ],
};

const FAQClient = dynamic(() => import("./client"));

export default function FAQPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", url: "/" },
          { name: "FAQ", url: "/faq" },
        ]}
      />

      {/* JSON-LD FAQPage - Critical para Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_DATA.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />

      <FAQClient />
    </>
  );
}
