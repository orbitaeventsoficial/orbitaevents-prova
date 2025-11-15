// app/packs/page.tsx
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ServiceJsonLD from "@/components/seo/ServiceJsonLD";
import FAQ from "@/components/seo/FAQ";
import { getAllPacks, getMinPriceByService } from "@/data/packs-config";
import LowCostBanner from "./LowCostBanner";

const PacksClient = dynamic(() => import("./client"), {
  loading: () => (
    <section className="mx-auto max-w-5xl px-4 py-20 text-center text-white/70" aria-busy="true">
      Cargando packs y tarifas…
    </section>
  ),
});

// PRECIOS 100% DINÁMICOS
const allPacks = getAllPacks().filter(p => ['fiestas', 'bodas', 'discomovil', 'empresas'].includes(p.service));
const minPrice = Math.min(...allPacks.map(p => p.priceValue));
const maxPrice = Math.max(...allPacks.map(p => p.priceValue));

export const metadata: Metadata = {
  title: `Packs y Tarifas desde ${minPrice}€ hasta ${maxPrice}€ | Òrbita Events`,
  description: `Packs desde ${minPrice}€ hasta ${maxPrice}€ para bodas, fiestas, discomóvil y empresas. DJ + sonido EV + luces LED. Todo incluido.`,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://orbitaevents.com"),
  alternates: { canonical: "/packs" },
  openGraph: {
    title: `Packs y Tarifas desde ${minPrice}€ hasta ${maxPrice}€ | Òrbita Events`,
    description: `Packs desde ${minPrice}€ hasta ${maxPrice}€. Bodas, fiestas, empresas. DJ profesional + efectos. Barcelona, Lleida, Girona, Tarragona.`,
    url: "/packs",
    images: [{ url: "/api/og?title=Packs%20y%20Tarifas", alt: "Packs con Amplificadores EV y Cabezas Móviles LED" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Packs y Tarifas desde ${minPrice}€ hasta ${maxPrice}€ | Òrbita Events`,
    description: `Packs desde ${minPrice}€ hasta ${maxPrice}€. Bodas, fiestas, empresas. DJ profesional + efectos.`,
    images: ["/api/og?title=Packs%20y%20Tarifas"],
  },
  robots: { index: true, follow: true },
};

export default function PacksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Breadcrumbs items={[{ name: "Inicio", url: "/" }, { name: "Packs", url: "/packs" }]} />

      <ServiceJsonLD
        name="Packs y Tarifas Eventos"
        slugPath="/packs"
        description={`Packs de eventos con DJ, sonido y luces. Desde ${minPrice}€ hasta ${maxPrice}€. Todo incluido: montaje, desplazamiento, backup.`}
        serviceType={["Packs bodas", "Packs fiestas", "Packs eventos"]}
        areaServed={["Barcelona", "Girona", "Tarragona", "Lleida"]}
        priceFrom={minPrice.toString()}
        priceCurrency="EUR"
        availability="https://schema.org/InStock"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 35 }}
      />

      {/* PacksClient CON ESPACIO COMPLETO */}
      <main className="flex-1">
        <PacksClient />
      </main>

      {/* FAQ AL FINAL */}
      <FAQ 
        items={[
          {
            q: "¿Cuánto cuesta un pack para boda?",
            a: `Desde ${getMinPriceByService('bodas')}€ (solo baile) hasta ${maxPrice}€ (día completo). Ver packs arriba.`,
          },
          {
            q: "¿Hay pack low cost?",
            a: `Sí. Pack Cumple FLASH: ${minPrice}€ (2h DJ + 2 altavoces + luces). Solo cumpleaños pequeños.`,
          },
          {
            q: "¿Qué incluye cada pack?",
            a: "DJ, sonido EV, luces LED, montaje, desmontaje, desplazamiento. Detalles arriba.",
          },
          {
            q: "¿Cubrís toda Catalunya?",
            a: "Sí. Barcelona, Lleida, Girona, Tarragona. Desplazamiento incluido.",
          },
        ]} 
      />

      <LowCostBanner />
    </div>
  );
}