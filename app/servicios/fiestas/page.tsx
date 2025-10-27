// app/servicios/fiestas/page.tsx
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Breadcrumbs from "@/app/components/seo/Breadcrumbs";
import ServiceJsonLD from "@/app/components/seo/ServiceJsonLD";

export const metadata: Metadata = {
  title: "Fiestas privadas y temáticas | Òrbita Events",
  description:
    "DJ, sonido e iluminación para cumpleaños, cenas y fiestas temáticas. Producción técnica, ambiente cuidado y criterio musical real.",
  alternates: { canonical: "/servicios/fiestas" },
  openGraph: {
    title: "Fiestas privadas y temáticas | Òrbita Events",
    description:
      "DJ, sonido e iluminación para cumpleaños, cenas y fiestas temáticas. Producción técnica, ambiente cuidado y criterio musical real.",
    url: "/servicios/fiestas",
    images: [{ url: "/api/og?title=Fiestas%20privadas%20y%20tem%C3%A1ticas" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Fiestas privadas y temáticas | Òrbita Events",
    description:
      "DJ, sonido e iluminación para cumpleaños, cenas y fiestas temáticas. Producción técnica, ambiente cuidado y criterio musical real.",
    images: ["/api/og?title=Fiestas%20privadas%20y%20tem%C3%A1ticas"]
  },
  robots: { index: true, follow: true }
};

const FiestasClient = dynamic(() => import("./client"), {
  ssr: false,
  loading: () => (
    <section
      className="mx-auto max-w-5xl px-4 py-20 text-center text-white/70"
      aria-busy="true"
    >
      Cargando sección Fiestas y temáticas…
    </section>
  )
});

export default function FiestasPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", url: "/" },
          { name: "Servicios", url: "/servicios" },
          { name: "Fiestas y temáticas", url: "/servicios/fiestas" }
        ]}
      />

      <ServiceJsonLD
        name="Fiestas privadas y temáticas"
        slugPath="/servicios/fiestas"
        description="DJ, sonido e iluminación para cumpleaños, cenas y fiestas temáticas. Producción técnica, ambiente cuidado y criterio musical real."
        serviceType="Fiestas y eventos privados"
        areaServed={["Barcelona", "Girona", "Tarragona", "Lleida", "Catalunya"]}
      />

      <FiestasClient />
    </>
  );
}
