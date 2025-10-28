// app/servicios/bodas/page.tsx
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Breadcrumbs from "@/app/components/seo/Breadcrumbs";
import ServiceJsonLD from "@/app/components/seo/ServiceJsonLD";

export const metadata: Metadata = {
  title: "Bodas con técnica impecable y emoción real | Òrbita Events",
  description:
    "Ceremonia clara, cóctel elegante y fiesta con sonido impecable. DJ profesional, luz cálida y tiempos bien medidos.",
  alternates: { canonical: "/servicios/bodas" },
  openGraph: {
    title: "Bodas con técnica impecable y emoción real | Òrbita Events",
    description:
      "Ceremonia clara, cóctel elegante y fiesta con sonido impecable. DJ profesional, luz cálida y tiempos bien medidos.",
    url: "/servicios/bodas",
    images: [
      { url: "/api/og?title=Bodas%20con%20t%C3%A9cnica%20impecable%20y%20emoci%C3%B3n%20real" }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Bodas con técnica impecable y emoción real | Òrbita Events",
    description:
      "Ceremonia clara, cóctel elegante y fiesta con sonido impecable. DJ profesional, luz cálida y tiempos bien medidos.",
    images: ["/api/og?title=Bodas%20con%20t%C3%A9cnica%20impecable%20y%20emoci%C3%B3n%20real"]
  },
  robots: { index: true, follow: true }
};

const BodasClient = dynamic(() => import("./client"), {
  ssr: false,
  loading: () => (
    <section
      className="mx-auto max-w-5xl px-4 py-20 text-center text-white/70"
      aria-busy="true"
    >
      Cargando sección Bodas…
    </section>
  )
});

export default function BodasPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", url: "/" },
          { name: "Servicios", url: "/servicios" },
          { name: "Bodas", url: "/servicios/bodas" }
        ]}
      />

      <ServiceJsonLD
        name="Bodas con técnica impecable y emoción real"
        slugPath="/servicios/bodas"
        description="Ceremonia clara, cóctel elegante y fiesta con sonido impecable. DJ profesional, luz cálida y tiempos bien medidos."
        serviceType="Bodas: sonido, luz y DJ"
        areaServed={["Barcelona", "Girona", "Tarragona", "Lleida", "Catalunya"]}
      />

      <BodasClient />
    </>
  );
}
