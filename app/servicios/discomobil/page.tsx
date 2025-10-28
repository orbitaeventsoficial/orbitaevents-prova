// app/servicios/discomobil/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Breadcrumbs from "@/app/components/seo/Breadcrumbs";
import ServiceJsonLD from "@/app/components/seo/ServiceJsonLD";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://orbitaevents-prova.vercel.app";

export const metadata: Metadata = {
  title: "Discomóvil profesional | Òrbita Events",
  description:
    "DJ, sonido e iluminación para fiestas y bodas. Montaje limpio, sonido equilibrado y luces sincronizadas.",
  alternates: { canonical: "/servicios/discomobil" },
  openGraph: {
    title: "Discomóvil profesional | Òrbita Events",
    description:
      "DJ real, sonido limpio y luces con intención. Paquetes claros para bodas y eventos.",
    url: "/servicios/discomobil",
    images: [{ url: "/img/brand/og-square.jpg", width: 1200, height: 1200 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Discomóvil profesional | Òrbita Events",
    description:
      "DJ real, sonido limpio y luces con intención. Paquetes claros para bodas y eventos.",
    images: ["/img/brand/og-square.jpg"]
  },
  robots: { index: true, follow: true }
};

// Carga con SSR (por defecto). Nada de ssr:false.
const DiscomovilClient = dynamic(() => import("./client"), {
  loading: () => (
    <section
      className="mx-auto max-w-5xl px-4 py-20 text-center text-white/70"
      aria-busy="true"
    >
      Cargando Discomóvil…
    </section>
  )
});

export default function DiscomovilPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", url: "/" },
          { name: "Servicios", url: "/servicios" },
          { name: "Discomóvil", url: "/servicios/discomobil" }
        ]}
      />

      <ServiceJsonLD
        name="Discomóvil profesional"
        slugPath="/servicios/discomobil"
        description="DJ, sonido e iluminación para fiestas y bodas. Montaje limpio, sonido equilibrado y luces sincronizadas."
        serviceType="Discomóvil y DJ"
        areaServed={["Barcelona", "Girona", "Tarragona", "Lleida", "Catalunya"]}
        image={`${SITE_URL}/img/brand/og-square.jpg`}
      />

      <DiscomovilClient />
    </>
  );
}
