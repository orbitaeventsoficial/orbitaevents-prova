// app/page.tsx
"use client";
import React, { useState } from "react";
import HeroPortalLogo from "./components/ui/HeroPortalLogo.client";
import Hero from "./components/ui/Hero";
import Section from "./components/ui/Section";
import Button from "./components/ui/Button";
import SmartImage from "./components/ui/SmartImage";

const PHONE = "+34699121023";
const WA_TEXT = "Hola, vengo desde la web y quiero información para mi evento";

function Feature({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) {
  return (
    <div className="oe-card p-8 hover:border-white/20 transition">
      <div className="mb-4 text-4xl" aria-hidden>
        {icon}
      </div>
      <h3 className="text-2xl md:text-3xl font-bold font-[var(--font-space)]">
        {title}
      </h3>
      <p className="mt-3 oe-muted leading-relaxed">{desc}</p>
    </div>
  );
}

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Splash cinematográfico: blackout + burbujas + planeta/anillo/satélite centrados */}
      {!ready && (
        <HeroPortalLogo
          endColor="#000"
          sizePx={180}
          liftVh={0}
          glowColor="gold"
          glowStrength={0.75}
          bubbles
          svgUrl="/img/brand/orbita-glyph.anim.svg"
          durationMs={5800}
          fadeMs={900}
          introHoldMs={400}
          respectOnce={false}
          suppressSelectors={[
            "[data-hero-planet]",
            ".hero-planet",
            ".planet-bg",
            "#content [class*='planet']"
          ]}
          onFinish={() => setReady(true)}
        />
      )}

      {/* HERO PRINCIPAL */}
      <Hero
        title="DJ, sonido e iluminación que venden el evento por sí solos"
        subtitle="Bodas, fiestas y empresas en Catalunya. Montaje limpio, criterio musical real y una pista encendida hasta el último tema."
      >
        <Button
          variant="primary"
          href="/contacto"
          data-evt="cta_hero_presupuesto"
          aria-label="Solicitar presupuesto"
        >
          Pide presupuesto
        </Button>
        <Button
          href={`https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(WA_TEXT)}&utm_source=site&utm_medium=cta&utm_campaign=hero`}
          target="_blank"
          rel="noopener noreferrer"
          data-evt="cta_hero_whatsapp"
          aria-label="Abrir conversación de WhatsApp"
        >
          WhatsApp directo
        </Button>
      </Hero>

      {/* BLOQUE DE SERVICIOS DESTACADOS */}
      <Section className="py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <Feature
            icon="🎧"
            title="DJ y sesiones"
            desc="Mezclas reales, lectura de pista y selección afinada. Sin listas pregrabadas."
          />
          <Feature
            icon="🔊"
            title="Sonido profesional"
            desc="Cobertura nítida y homogénea, con potencia controlada y estética de montaje impecable."
          />
          <Feature
            icon="💡"
            title="Iluminación"
            desc="Ambientes cálidos, efectos sincronizados y foco en lo que importa: que tu evento se vea y se sienta premium."
          />
        </div>
      </Section>

      {/* GALERÍA */}
      <Section className="py-20">
        <h2 className="text-center text-4xl md:text-5xl font-[var(--font-space)] font-bold mb-12">
          Escenas que hablan por sí solas
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["foto1.jpg", "foto2.jpg", "foto3.jpg"].map((img, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <SmartImage
                src={`/img/home/${img}`}
                alt={`Evento ${i + 1}`}
                fill
                sizes="(max-width:768px) 100vw, 1200px"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section className="py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-[var(--font-space)] font-bold">
          ¿Listo para un evento que se vende solo?
        </h2>
        <p className="mt-4 oe-muted max-w-2xl mx-auto">
          Escríbenos y te devolvemos un plan claro: técnica, repertorio y tiempos. Sin rodeos.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="primary" href="/contacto" data-evt="cta_final_contacto">
            Contactar ahora
          </Button>
          <Button
            href={`https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(WA_TEXT)}&utm_source=site&utm_medium=cta&utm_campaign=final`}
            target="_blank"
            rel="noopener noreferrer"
            data-evt="cta_final_whatsapp"
          >
            WhatsApp
          </Button>
        </div>
      </Section>
    </main>
  );
}
