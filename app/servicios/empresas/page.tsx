// app/servicios/empresas/page.tsx
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Breadcrumbs from "@/app/components/seo/Breadcrumbs";
import ServiceJsonLD from "@/app/components/seo/ServiceJsonLD";

export const metadata: Metadata = {
  title: "Eventos de empresa | Òrbita Events",
  description:
    "Sonido, iluminación y DJ para presentaciones, cócteles y cenas de empresa. Producción técnica con criterio y ejecución impecable.",
  alternates: { canonical: "/servicios/empresas" },
  openGraph: {
    title: "Eventos de empresa | Òrbita Events",
    description:
      "Sonido, iluminación y DJ para presentaciones, cócteles y cenas de empresa. Producción técnica con criterio y ejecución impecable.",
    url: "/servicios/empresas",
    images: [{ url: "/api/og?title=Eventos%20de%20empresa" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventos de empresa | Òrbita Events",
    description:
      "Sonido, iluminación y DJ para presentaciones, cócteles y cenas de empresa. Producción técnica con criterio y ejecución impecable.",
    images: ["/api/og?title=Eventos%20de%20empresa"]
  },
  robots: { index: true, follow: true }
};

const EmpresaClient = dynamic(() => import("./client"), {
  ssr: false,
  loading: () => (
    <section
      className="mx-auto max-w-5xl px-4 py-20 text-center text-white/70"
      aria-busy="true"
    >
      Cargando sección Eventos de empresa…
    </section>
  )
});

export default function EmpresaPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", url: "/" },
          { name: "Servicios", url: "/servicios" },
          { name: "Eventos de empresa", url: "/servicios/empresas" }
        ]}
      />

      <ServiceJsonLD
        name="Eventos de empresa"
        slugPath="/servicios/empresas"
        description="Sonido, iluminación y DJ para presentaciones, cócteles y cenas de empresa. Producción técnica con criterio y ejecución impecable."
        serviceType="Eventos corporativos y empresariales"
        areaServed={["Barcelona", "Girona", "Tarragona", "Lleida", "Catalunya"]}
      />

      <EmpresaClient />
    </>
  );
}
