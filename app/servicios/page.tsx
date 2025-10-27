// app/servicios/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Breadcrumbs from "@/app/components/seo/Breadcrumbs";

// Base absoluta solo para JSON-LD (recomendado por Google)
const BASE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://orbitaevents-prova.vercel.app";

export const metadata: Metadata = {
  title: "Servicios | Òrbita Events",
  description:
    "DJ, sonido e iluminación con criterio. Montajes ordenados, niveles seguros y sesiones que funcionan.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios | Òrbita Events",
    description:
      "DJ, sonido e iluminación con criterio. Montajes ordenados, niveles seguros y sesiones que funcionan.",
    url: "/servicios",
    images: [{ url: "/api/og?title=Servicios" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios | Òrbita Events",
    description:
      "DJ, sonido e iluminación con criterio. Montajes ordenados, niveles seguros y sesiones que funcionan.",
    images: ["/api/og?title=Servicios"]
  },
  robots: { index: true, follow: true }
};

// JSON-LD en servidor para indexación (ItemList de servicios)
function ServicesItemListJsonLD() {
  const json = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      { "@type": "Service", name: "Discomóvil",         url: `${BASE}/servicios/discomobil` },
      { "@type": "Service", name: "Bodas",              url: `${BASE}/servicios/bodas` },
      { "@type": "Service", name: "Fiestas",            url: `${BASE}/servicios/fiestas` },
      { "@type": "Service", name: "Empresas",           url: `${BASE}/servicios/empresas` },
      { "@type": "Service", name: "Producción técnica", url: `${BASE}/servicios/produccion` },
      { "@type": "Service", name: "Alquiler",           url: `${BASE}/servicios/alquiler` }
    ]
  } as const;

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

const ServiciosClient = dynamic(() => import("./client"), {
  ssr: false,
  loading: () => (
    <section
      className="mx-auto max-w-5xl px-4 py-20 text-center text-white/70"
      aria-busy="true"
    >
      Cargando Servicios…
    </section>
  )
});

export default function ServiciosPage() {
  return (
    <>
      {/* Migas visibles (rutas relativas) */}
      <Breadcrumbs
        items={[
          { name: "Inicio", url: "/" },
          { name: "Servicios", url: "/servicios" }
        ]}
      />

      {/* ItemList JSON-LD server-side */}
      <ServicesItemListJsonLD />

      <ServiciosClient />
    </>
  );
}
