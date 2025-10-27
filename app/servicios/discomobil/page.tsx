// app/servicios/discomobil/page.tsx
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Breadcrumbs from "@/app/components/seo/Breadcrumbs";
import ServiceJsonLD from "@/app/components/seo/ServiceJsonLD";

export const metadata: Metadata = {
  title: "Discomóvil profesional | Òrbita Events",
  description:
    "DJ, sonido e iluminación para fiestas y bodas. Discomóvil con montaje limpio, sonido equilibrado y luces sincronizadas.",
  alternates: { canonical: "/servicios/discomobil" },
  openGraph: {
    title: "Discomóvil profesional | Òrbita Events",
    description:
      "DJ, sonido e iluminación para fiestas y bodas. Discomóvil con montaje limpio, sonido equilibrado y luces sincronizadas.",
    url: "/servicios/discomobil",
    images: [{ url: "/api/og?title=Discom%C3%B3vil%20profesional" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Discomóvil profesional | Òrbita Events",
    description:
      "DJ, sonido e iluminación para fiestas y bodas. Discomóvil con montaje limpio, sonido equilibrado y luces sincronizadas.",
    images: ["/api/og?title=Discom%C3%B3vil%20profesional"]
  },
  robots: { index: true, follow: true }
};

const DiscomovilClient = dynamic(() => import("./client"), {
  ssr: false,
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
        description="DJ, sonido e iluminación para fiestas y bodas. Discomóvil con montaje limpio, sonido equilibrado y luces sincronizadas."
        serviceType="Discomóvil y DJ"
        areaServed={["Barcelona", "Girona", "Tarragona", "Lleida", "Catalunya"]}
      />

      <DiscomovilClient />
    </>
  );
}
