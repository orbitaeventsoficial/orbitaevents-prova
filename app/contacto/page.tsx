// app/contacto/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Breadcrumbs from "@/app/components/seo/Breadcrumbs";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://orbitaevents-prova.vercel.app";

export const metadata: Metadata = {
  title: "Contacto y reservas | Òrbita Events",
  description:
    "Cuéntanos fecha, lugar y tipo de evento. Respuesta con disponibilidad y presupuesto cerrado.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto y reservas | Òrbita Events",
    description:
      "Cuéntanos fecha, lugar y tipo de evento. Respuesta con disponibilidad y presupuesto cerrado.",
    url: "/contacto",
    images: [{ url: "/img/brand/og-square.jpg", width: 1200, height: 1200 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto y reservas | Òrbita Events",
    description:
      "Cuéntanos fecha, lugar y tipo de evento. Respuesta con disponibilidad y presupuesto cerrado.",
    images: ["/img/brand/og-square.jpg"],
    creator: "@orbitaevents"
  },
  robots: { index: true, follow: true }
};

/* JSON-LD SEO con IDs absolutos */
function ContactJsonLD() {
  const json = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contacto#contactpage`,
    name: "Contacto y reservas",
    url: `${SITE_URL}/contacto`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/contacto` },
    about: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`
    },
    potentialAction: {
      "@type": "ContactAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/contacto#form` }
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

// Import dinámico (SSR activo por defecto)
const ContactoClient = dynamic(() => import("./client"), {
  loading: () => (
    <section
      className="mx-auto max-w-5xl px-4 py-20 text-center text-white/70 min-h-[50vh]"
      aria-busy="true"
    >
      Cargando formulario de contacto…
    </section>
  )
});

export default function ContactoPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", url: "/" },
          { name: "Contacto", url: "/contacto" }
        ]}
      />
      <ContactJsonLD />
      <ContactoClient />
    </>
  );
}
