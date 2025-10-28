// app/portfolio/page.tsx
import type { Metadata } from "next";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import SmartImage from "../components/ui/SmartImage";
import Button from "../components/ui/Button";

const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_E164 || "+34699121023";
const WA_TEXT =
  "Hola, vengo desde la web y quiero información para mi evento";

export const metadata: Metadata = {
  title: "Portfolio | Òrbita Events",
  description:
    "Proyectos reales: técnica, música y ambientación para bodas, fiestas y empresas.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio | Òrbita Events",
    description:
      "Proyectos que hablan por sí solos. Técnica, música y ambientación con criterio.",
    url: "/portfolio",
    images: [{ url: "/img/brand/og-square.jpg", width: 1200, height: 1200 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Òrbita Events",
    description:
      "Proyectos que hablan por sí solos. Técnica, música y ambientación con criterio.",
    images: ["/img/brand/og-square.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function Portfolio() {
  return (
    // NO pongas bg-black aquí: el fondo ya lo aplica el layout (bg-main).
    <main className="min-h-screen text-white overflow-hidden no-hero-shadow">
      {/* HERO PRINCIPAL */}
      <Hero
        title="Portfolio"
        subtitle="Proyectos que hablan por sí solos. Cada evento, una historia con ritmo, luz y emoción."
      >
        <Button variant="primary" href="/contacto" data-evt="cta_portfolio_presupuesto">
          Solicitar presupuesto
        </Button>
      </Hero>

      {/* SECCIÓN DE PROYECTOS */}
      <Section className="py-16">
        <h2 className="text-center text-4xl md:text-5xl font-[var(--font-space)] font-bold mb-12">
          Algunos de nuestros eventos
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {["portfolio1.jpg", "portfolio2.jpg", "portfolio3.jpg"].map((img, i) => (
            <article
              key={i}
              className="overflow-hidden rounded-3xl border border-white/10 hover:border-white/20 transition"
            >
              {/* El contenedor debe ser relative si usas Image fill */}
              <div className="relative aspect-[4/3]">
                <SmartImage
                  src={`/img/portfolio/${img}`}
                  alt={`Proyecto ${i + 1}`}
                  fill
                  sizes="(max-width:768px) 100vw, 1200px"
                />
              </div>
              <div className="p-6 bg-black/40 backdrop-blur-sm">
                <h3 className="text-2xl font-bold font-[var(--font-space)]">
                  Evento {i + 1}
                </h3>
                <p className="mt-2 text-sm oe-muted">
                  Producción técnica, DJ y ambientación completa.
                </p>
                <div className="mt-4">
                  <Button
                    href={`https://wa.me/${PHONE.replace("+","")}?text=${encodeURIComponent(WA_TEXT)}&utm_source=site&utm_medium=cta&utm_campaign=portfolio_card`}
                    data-evt="cta_portfolio_card"
                  >
                    Quiero algo así
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section className="py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-[var(--font-space)] font-bold">
          ¿Quieres un evento que destaque?
        </h2>
        <p className="mt-4 oe-muted max-w-2xl mx-auto">
          Cuéntanos tu idea y la haremos brillar con sonido, luz y ritmo.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="primary" href="/contacto" data-evt="cta_portfolio_final_contacto">
            Contactar ahora
          </Button>
          <Button
            href={`https://wa.me/${PHONE.replace("+","")}?text=${encodeURIComponent(WA_TEXT)}&utm_source=site&utm_medium=cta&utm_campaign=portfolio_final`}
            target="_blank"
            rel="noopener noreferrer"
            data-evt="cta_portfolio_final_whatsapp"
          >
            WhatsApp
          </Button>
        </div>
      </Section>
    </main>
  );
}
