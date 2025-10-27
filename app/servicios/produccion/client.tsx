"use client";

import { useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Cable,
  Lightbulb,
  Wrench,
  Gauge,
  BadgeCheck,
  Speaker,
  Guitar,
  Mic2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const GOLD = "var(--oe-gold, #d7b86e)";
const cx = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

/* ===== JSON-LD (Service) con URLs absolutas ===== */
function ServiceJsonLD() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://orbitaevents.cat";

  const json = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${base}/servicios/produccion#service`,
    name: "Producción técnica de eventos",
    description:
      "Planificación, montaje y operación técnica con criterio: sonido limpio, luz con gusto y ejecución sin sustos.",
    url: `${base}/servicios/produccion`,
    serviceType: ["Sonido", "Iluminación", "Operación", "DJ"],
    areaServed: ["Barcelona", "Girona", "Tarragona", "Lleida"],
    provider: {
      "@type": "Organization",
      name: "Òrbita Events",
      url: base,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
      },
      url: `${base}/contacto`,
    },
  };

  return (
    <script
      type="application/ld+json"
      // @ts-expect-error
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

function ChromeText({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-100"
      style={{
        WebkitTextStroke: "0.5px rgba(255,255,255,0.25)",
        textShadow: "0 0 24px rgba(255,255,255,0.15)",
      }}
    >
      {children}
    </span>
  );
}

/* Botón dorado consistente sin inline styles */
function CtaGold({
  href,
  children,
  ariaLabel,
  dataEvent,
  dataLabel,
}: {
  href: string;
  children: React.ReactNode;
  ariaLabel?: string;
  dataEvent?: string;
  dataLabel?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      data-event={dataEvent}
      data-label={dataLabel}
      className={cx(
        "inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-slate-900",
        "bg-gradient-to-br from-[#f1d99c] via-[#e9c87a] to-[#d7b86e]",
        "shadow-[0_8px_40px_rgba(215,184,110,0.25)]",
        "hover:scale-[1.02] active:scale-[0.98] transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      )}
    >
      {children}
    </Link>
  );
}

/* HERO */
function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="hero" className="relative pt-32 pb-20 text-center">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl px-4"
      >
        <h1 className="text-[40px] md:text-[56px] font-black leading-[1.05] tracking-tight text-white mb-3">
          <ChromeText>Sin técnica no hay magia</ChromeText>
        </h1>
        <p className="text-white/80 text-lg">
          Planificación, montaje y operación con criterio. El público disfruta, el evento fluye y tú descansas.
        </p>

        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 backdrop-blur">
            <BadgeCheck className="h-4 w-4" aria-hidden /> Montaje limpio
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 backdrop-blur">
            <Sparkles className="h-4 w-4" aria-hidden /> Escenas medidas
          </span>
        </div>
      </motion.div>
    </section>
  );
}

/* PROCESO */
function Proceso() {
  const reduce = useReducedMotion();
  const steps = [
    { icon: Wrench, title: "Preproducción", desc: "Brief técnico, riders, medición del espacio y plan de cableado." },
    { icon: Cable, title: "Montaje y pruebas", desc: "Backline, patch, afinado de PA y test de microfonía." },
    { icon: Gauge, title: "Operación", desc: "Escenas de luz, dinámicas de audio y control de niveles seguros." },
    { icon: BadgeCheck, title: "Desmontaje limpio", desc: "Tiempo ajustado, sin dañar el espacio ni dejar rastro." },
  ] as const;

  return (
    <section id="proceso" className="relative py-16">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80 backdrop-blur"
          >
            <s.icon className="mb-3 h-8 w-8" style={{ color: GOLD }} aria-hidden />
            <h3 className="text-lg font-semibold text-white mb-1">{s.title}</h3>
            <p className="text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* EQUIPAMIENTO CLAVE */
function Equipamiento() {
  const reduce = useReducedMotion();
  const items = [
    { icon: Speaker, title: "PA y monitores", list: ["Full-range con limitación", "Subgrave según aforo", "Distribución por zonas"] },
    { icon: Mic2, title: "Microfonía", list: ["Inalámbricos de diadema y mano", "Antenas y diversity", "Filtros y compresión suave"] },
    { icon: Lightbulb, title: "Luz", list: ["Wash cálido", "Efectos moderados", "Escenas preprogramadas"] },
    { icon: Guitar, title: "Cabina DJ", list: ["Pioneer DDJ-REV7", "Control de cabina", "Monitores nearfield"] },
  ] as const;

  return (
    <section id="equipamiento" className="relative py-16">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80 backdrop-blur"
          >
            <it.icon className="mb-3 h-8 w-8" style={{ color: GOLD }} aria-hidden />
            <h3 className="text-lg font-semibold text-white mb-2">{it.title}</h3>
            <ul
              className="list-disc pl-5 space-y-1 text-sm"
              aria-label={`Equipamiento de ${it.title}`}
            >
              {it.list.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* CTA */
function CTA() {
  const phone = "+34699121023";
  const waUrl = useMemo(
    () =>
      `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hola Òrbita, necesito producción técnica para mi evento."
      )}`,
    []
  );

  // Delegación robusta para analytics
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.<HTMLElement>("[data-event]");
      if (target) {
        window.dispatchEvent(
          new CustomEvent("track", {
            detail: {
              event: target.getAttribute("data-event") || "",
              label: target.getAttribute("data-label") || "",
            },
          })
        );
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <section id="contacto" className="relative py-20 text-center">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-3">
          <ChromeText>Que la técnica esté a favor</ChromeText>
        </h2>
        <p className="text-white/70 mb-6">
          Cuéntanos formato, horarios y aforo. Te proponemos un plan claro con material y tiempos.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <CtaGold
            href={waUrl}
            ariaLabel="Abrir WhatsApp para solicitar producción técnica"
            dataEvent="cta_whatsapp"
            dataLabel="produccion"
          >
            WhatsApp
          </CtaGold>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            data-event="cta_contacto"
            data-label="produccion"
            aria-label="Ir al formulario de contacto"
          >
            Formulario de contacto
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ProduccionClient() {
  return (
    <div className="min-h-screen bg-main text-white">
      <ServiceJsonLD />
      <Hero />
      <Proceso />
      <Equipamiento />
      <CTA />
    </div>
  );
}
