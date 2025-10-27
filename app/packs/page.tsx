// app/packs/page.tsx
import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packs y tarifas | Òrbita Events",
  description:
    "Packs cerrados para bodas y fiestas. Tarifas claras, montaje profesional y extras opcionales según el espacio.",
  alternates: { canonical: "/packs" },
  openGraph: {
    title: "Packs y tarifas | Òrbita Events",
    description:
      "Packs cerrados para bodas y fiestas. Tarifas claras, montaje profesional y extras opcionales según el espacio.",
    url: "/packs",
    images: [{ url: "/api/og?title=Packs%20y%20tarifas" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Packs y tarifas | Òrbita Events",
    description:
      "Packs cerrados para bodas y fiestas. Tarifas claras, montaje profesional y extras opcionales según el espacio.",
    images: ["/api/og?title=Packs%20y%20tarifas"]
  },
  robots: { index: true, follow: true }
};

const PacksClient = dynamic(() => import("./client"), {
  ssr: false,
  loading: () => (
    <section
      className="mx-auto max-w-5xl px-4 py-20 text-center text-white/70"
      aria-busy="true"
    >
      Cargando packs y tarifas…
    </section>
  )
});

export default function PacksPage() {
  return <PacksClient />;
}
