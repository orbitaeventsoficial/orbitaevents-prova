// app/contacto/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Breadcrumbs from "@/app/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contacto y reservas | Òrbita Events",
  description: "Cuéntanos fecha, lugar y tipo de evento. Respuesta con disponibilidad y presupuesto cerrado.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto y reservas | Òrbita Events",
    description: "Cuéntanos fecha, lugar y tipo de evento. Respuesta con disponibilidad y presupuesto cerrado.",
    url: "/contacto",
    images: [{ url: "/api/og?title=Contacto%20y%20reservas" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto y reservas | Òrbita Events",
    description: "Cuéntanos fecha, lugar y tipo de evento. Respuesta con disponibilidad y presupuesto cerrado.",
    images: ["/api/og?title=Contacto%20y%20reservas"]
  },
  robots: { index: true, follow: true }
};

function ContactJsonLD() {
  const json = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "/contacto#contactpage",
    name: "Contacto y reservas",
    url: "/contacto",
    mainEntityOfPage: { "@type": "WebPage", "@id": "/contacto" },
    about: {
      "@type": "Organization",
      "@id": "/#organization",
      name: "Òrbita Events",
      url: "/",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+34699121023",
          contactType: "customer service",
          areaServed: ["ES"],
          availableLanguage: ["es", "ca"]
        }
      ]
    },
    potentialAction: {
      "@type": "ContactAction",
      target: { "@type": "EntryPoint", urlTemplate: "/contacto#form" }
    }
  } as const;

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

const ContactoClient = dynamic(() => import("./client"), {
  ssr: false,
  loading: () => (
    <section className="mx-auto max-w-5xl px-4 py-20 text-center text-white/70 min-h-[50vh]" aria-busy="true">
      Cargando formulario de contacto…
    </section>
  )
});

export default function ContactoPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Inicio", url: "/" }, { name: "Contacto", url: "/contacto" }]} />
      <ContactJsonLD />
      <ContactoClient />
    </>
  );
}
