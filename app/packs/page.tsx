// app/packs/page.tsx
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Breadcrumbs from "@\/components/seo/Breadcrumbs";
import ServiceJsonLD from "@\/components/seo/ServiceJsonLD";
import FAQ from "@\/components/seo/FAQ";

export const metadata: Metadata = {
  title: "Packs y Tarifas | EV ETX + B-150 LED + Pioneer DJ desde 350€ | Òrbita Events",
  description:
    "Packs cerrados para bodas, fiestas y eventos. EV ETX-15P 2000W, cabezas móviles B-150 LED, Pioneer DJ. Montaje incluido y extras opcionales.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://orbitaevents.com"),
  alternates: { canonical: "/packs" },
  openGraph: {
    title: "Packs y Tarifas | Òrbita Events",
    description:
      "Tarifas claras con EV ETX-15P, B-150 LED y Pioneer DJ. Elige tu pack y amplía según tu evento.",
    url: "/packs",
    images: [
      {
        url: "/api/og?title=Packs%20y%20Tarifas",
        alt: "Packs con EV ETX-15P y B-150 LED",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Packs y Tarifas | Òrbita Events",
    description:
      "EV ETX-15P + B-150 LED desde 350 €. Montaje profesional y extras opcionales.",
    images: ["/api/og?title=Packs%20y%20Tarifas"],
  },
  robots: { index: true, follow: true },
};

const PacksClient = dynamic(() => import("./client"), {
  loading: () => (
    <section
      className="mx-auto max-w-5xl px-4 py-20 text-center text-white/70"
      aria-busy="true"
    >
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

      <ServiceJsonLD
        name="Packs y Tarifas Eventos"
        slugPath="/packs"
        description="Packs con EV ETX-15P 2000W, cabezas móviles B-150 LED y Pioneer DJ. Desde 350 € con montaje. Extras opcionales."
        serviceType={["Packs bodas", "Packs fiestas", "Packs eventos"]}
        areaServed={["Barcelona", "Girona", "Tarragona", "Lleida"]}
        priceFrom="350"
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
            a: "Desde 350 €: 2 altavoces EV ETX-15P (2000 W), multibox LED, DJ hasta 3 h con Pioneer DDJ-REV7 y montaje incluido. Ideal hasta 60 personas.",
          },
          {
            q: "¿Qué diferencia hay entre Pro y Premium?",
            a: "Pro: pensado para eventos de hasta 150 personas, añade subgrave EV ETX-18SP y 4 cabezas móviles B-150 LED, con DJ hasta 6 h. Premium: full setup con EV ETX + B-150, técnico dedicado y DJ durante todo el evento, ideal para bodas y fiestas grandes.",
          },
          {
            q: "¿Puedo añadir extras?",
            a: "Sí. Hora extra de DJ +100 €/h, máquina de burbujas +70 €, humo bajo +70 €, 4 cabezas móviles extra +150 €, tematización decorativa desde +300 €.",
          },
          {
            q: "¿Hay desplazamiento fuera de Barcelona?",
            a: "Sí, trabajamos en toda Catalunya. Desplazamiento incluido en packs a partir de 600 €. Para otros casos, suplemento desde +50 € según la zona.",
          },
        ]}
      />

      <PacksClient />
    </>
  );
}
