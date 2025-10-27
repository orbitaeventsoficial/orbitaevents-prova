// app/servicios/alquiler/page.tsx
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Breadcrumbs from "@/app/components/seo/Breadcrumbs";
import ServiceJsonLD from "@/app/components/seo/ServiceJsonLD";

export const metadata: Metadata = {
  title: "Alquiler y producción técnica | Òrbita Events",
  description:
    "Equipos de sonido, luces y efectos para eventos. Opción con técnico o recogida. Servicio profesional y mantenimiento incluido.",
  alternates: { canonical: "/servicios/alquiler" },
  openGraph: {
    title: "Alquiler y producción técnica | Òrbita Events",
    description:
      "Equipos de sonido, luces y efectos para eventos. Opción con técnico o recogida. Servicio profesional y mantenimiento incluido.",
    url: "/servicios/alquiler",
    images: [{ url: "/api/og?title=Alquiler%20y%20producci%C3%B3n%20t%C3%A9cnica" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Alquiler y producción técnica | Òrbita Events",
    description:
      "Equipos de sonido, luces y efectos para eventos. Opción con técnico o recogida. Servicio profesional y mantenimiento incluido.",
    images: ["/api/og?title=Alquiler%20y%20producci%C3%B3n%20t%C3%A9cnica"]
  },
  robots: { index: true, follow: true }
};

const AlquilerClient = dynamic(() => import("./client"), {
  ssr: false,
  loading: () => (
    <section
      className="mx-auto max-w-5xl px-4 py-20 text-center text-white/70"
      aria-busy="true"
    >
      Cargando Alquiler…
    </section>
  )
});

export default function AlquilerPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", url: "/" },
          { name: "Servicios", url: "/servicios" },
          { name: "Alquiler", url: "/servicios/alquiler" }
        ]}
      />

      <ServiceJsonLD
        name="Alquiler y producción técnica"
        slugPath="/servicios/alquiler"
        description="Alquiler de equipos de sonido, iluminación y efectos para eventos. Con técnico o recogida. Servicio profesional y mantenimiento incluido."
        serviceType="Alquiler de equipos para eventos"
        areaServed={["Barcelona", "Girona", "Tarragona", "Lleida", "Catalunya"]}
      />

      <AlquilerClient />
    </>
  );
}
