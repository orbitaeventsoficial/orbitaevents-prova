// app/packs/page.tsx
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Breadcrumbs from "@/app/components/seo/Breadcrumbs";
import ServiceJsonLD from "@/app/components/seo/ServiceJsonLD";
import FAQ from "@/app/components/seo/FAQ";

export const metadata: Metadata = {
  title: "Packs y Tarifas | EV ETX + B-150 LED + Pioneer DJ desde 490€ | Òrbita Events",
  description: "Packs cerrados para bodas, fiestas, eventos. EV ETX-15P 2000W, 4 luces B-150 LED, Pioneer DJ. Montaje incluido, extras opcionales.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://orbitaevents.com"),
  alternates: { canonical: "/packs" },
  openGraph: {
    title: "Packs y Tarifas | Òrbita Events",
    description: "Tarifas claras con EV ETX-15P, B-150 LED y Pioneer DJ. Elige tu pack y amplía.",
    url: "/packs",
    images: [{ url: "/api/og?title=Packs%20y%20Tarifas", alt: "Packs con EV ETX-15P y B-150 LED" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Packs y Tarifas | Òrbita Events",
    description: "EV ETX-15P + 4 B-150 LED desde 490€. Montaje profesional.",
    images: ["/api/og?title=Packs%20y%20Tarifas"],
  },
  robots: { index: true, follow: true },
};

const PacksClient = dynamic(() => import("./client"), {
  loading: () => (
    <section className="mx-auto max-w-5xl px-4 py-20 text-center text-white/70" aria-busy="true">
      Cargando packs y tarifas…
    </section>
  ),
});

export default function PacksPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", url: "/" },
          { name: "Packs", url: "/packs" },
        ]}
      />

      {/* ← JSON-LD MEJORADO: OfferCatalog + aggregateRating */}
      <ServiceJsonLD
        name="Packs y Tarifas Eventos"
        slugPath="/packs"
        description="Packs con EV ETX-15P 2000W, 4 B-150 LED 150W, Pioneer DJ. Desde 490€ con montaje."
        serviceType={["Packs bodas", "Packs fiestas", "Packs eventos"]}
        areaServed={["Barcelona", "Girona", "Tarragona", "Lleida"]}
        priceFrom="490"
        priceCurrency="EUR"
        availability="https://schema.org/InStock"
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: 35,
        }}
      />

      <FAQ
        items={[
          {
            q: "¿Qué incluye el pack Esencial?",
            a: "Desde 490€: 2 EV ETX-15P, 4 B-150 LED, DJ 4h, montaje incluido. Ideal para 50-100 personas.",
          },
          {
            q: "¿Puedo añadir extras como subwoofer?",
            a: "Sí, +100€ por sub. También Pioneer DJM-900 + CDJ-3000 por +200€.",
          },
          {
            q: "¿Hay desplazamiento a Girona?",
            a: "Incluido en packs >600€. Resto +50€.",
          },
          {
            q: "¿Incluye técnico?",
            a: "Sí en todos los packs. Opcional extensión por horas +100€/h.",
          },
        ]}
      />

      <PacksClient />
    </>
  );
}
