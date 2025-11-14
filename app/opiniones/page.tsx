import { REVIEWS } from "@/data/reviews-data";
// app/opiniones/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Breadcrumbs from "@\/components/seo/Breadcrumbs";
import ServiceJsonLD from "@\/components/seo/ServiceJsonLD";
import FAQ from "@\/components/seo/FAQ";

export const metadata: Metadata = {
  title: "Opiniones Reales DJ Bodas Barcelona | 5/5 en 42 Reseñas | Òrbita Events",
description: "Opiniones reales de bodas, fiestas y eventos. Sonido impecable, iluminación cuidada y lleno de momentos inolvidables. Descubre experiencias auténticas.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://orbitaevents.com"),
  alternates: { canonical: "/opiniones" },
  openGraph: {
    title: "Opiniones Reales | Òrbita Events",
    description: "5/5 en bodas y eventos. Reseñas de clientes en Barcelona y Girona.",
    url: "/opiniones",
    images: [{ url: "/api/og?title=Opiniones%20Reales", alt: "Reseñas de bodas con DJ en Barcelona" }],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Opiniones Reales | Òrbita Events",
    description: "Lee reseñas de bodas premium",
    images: ["/api/og?title=Opiniones%20Reales"],
  },
  robots: { index: true, follow: true },
};

const OpinionesClient = dynamic(() => import("./client"));

export default function OpinionesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", url: "/" },
          { name: "Opiniones", url: "/opiniones" },
        ]}
      />

      {/* JSON-LD: AggregateRating + Reviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Òrbita Events",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: 5,
              reviewCount: 42,
              bestRating: 5,
              worstRating: 1,
            },
            review: REVIEWS.map((r) => ({
              "@type": "Review",
              author: { "@type": "Person", name: r.author },
              reviewRating: { "@type": "Rating", ratingValue: r.rating },
              datePublished: `${r.date}-01`,
              reviewBody: (r.comment ?? ""),
            })),
          }),
        }}
      />

<FAQ
  items={[
    {
      q: "¿Qué opinan los clientes de Òrbita Events?",
      a: "Valoración media de 5/5 en 42 reseñas. Nuestros clientes destacan el sonido impecable, el montaje ágil y la capacidad del DJ para mantener la pista encendida.",
    },
    {
      q: "¿Son reseñas reales?",
      a: "Sí, todas verificadas de bodas y eventos en Barcelona y Girona. Enlazamos directamente a Google y WeddingWire.",
    },
    {
      q: "¿Cómo puedo dejar una reseña?",
      a: "Puedes hacerlo desde Google o enviándola por correo. Cada opinión cuenta y nos ayuda a seguir mejorando.",
    },
  ]}
/>

      <OpinionesClient />
    </>
  );
}

