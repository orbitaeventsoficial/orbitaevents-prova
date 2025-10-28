// app/servicios/produccion/page.tsx
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Breadcrumbs from "@/app/components/seo/Breadcrumbs";
import ServiceJsonLD from "@/app/components/seo/ServiceJsonLD";

export const metadata: Metadata = {
  title: "Producción técnica | Òrbita Events",
  description:
    "Planificación, montaje y operación técnica con criterio: sonido limpio, luz con gusto y ejecución sin sustos.",
  alternates: { canonical: "/servicios/produccion" },
  openGraph: {
    title: "Producción técnica | Òrbita Events",
    description:
      "Planificación, montaje y operación técnica con criterio: sonido limpio, luz con gusto y ejecución sin sustos.",
    url: "/servicios/produccion",
    images: [{ url: "/api/og?title=Producci%C3%B3n%20t%C3%A9cnica" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Producción técnica | Òrbita Events",
    description:
      "Planificación, montaje y operación técnica con criterio: sonido limpio, luz con gusto y ejecución sin sustos.",
    images: ["/api/og?title=Producci%C3%B3n%20t%C3%A9cnica"]
  },
  robots: { index: true, follow: true }
};

const ProduccionClient = dynamic(() => import("./client"), {
  ssr: false,
  loading: () => (
    <section
      className="mx-auto max-w-5xl px-4 py-20 text-center text-white/70"
      aria-busy="true"
    >
      Cargando sección Producción técnica…
    </section>
  )
});

export default function ProduccionPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", url: "/" },
          { name: "Servicios", url: "/servicios" },
          { name: "Producción técnica", url: "/servicios/produccion" }
        ]}
      />

      <ServiceJsonLD
        name="Producción técnica"
        slugPath="/servicios/produccion"
        description="Planificación, montaje y operación técnica con criterio: sonido limpio, luz con gusto y ejecución sin sustos."
        serviceType="Producción y asistencia técnica para eventos"
        areaServed={["Barcelona", "Girona", "Tarragona", "Lleida", "Catalunya"]}
      />

      <ProduccionClient />
    </>
  );
}
