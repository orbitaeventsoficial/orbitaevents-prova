// app/page.tsx
import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Òrbita Events — Técnica, música y emoción",
  description:
    "Productora técnica con foco en discomóvil, tematizaciones y bodas. Sonido, luz y emoción controlada.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Òrbita Events — Técnica, música y emoción",
    description:
      "Productora técnica con foco en discomóvil, tematizaciones y bodas. Sonido, luz y emoción controlada.",
    url: "/",
    images: [{ url: "/api/og?title=%C3%92rbita%20Events" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Òrbita Events — Técnica, música y emoción",
    description:
      "Productora técnica con foco en discomóvil, tematizaciones y bodas. Sonido, luz y emoción controlada.",
    images: ["/api/og?title=%C3%92rbita%20Events"]
  },
  robots: { index: true, follow: true }
};

const ClientLanding = dynamic(() => import("./components/AppLanding.client"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-dvh items-center justify-center bg-main text-center text-lg text-white"
      aria-busy="true"
      aria-live="polite"
    >
      Cargando la experiencia de Òrbita Events...
    </div>
  )
});

export default function HomePage() {
  return <ClientLanding />;
}
