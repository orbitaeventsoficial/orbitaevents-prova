"use client";

import { motion } from "framer-motion";
import { Music2, Sparkles, Lightbulb, BadgeCheck } from "lucide-react";
import Link from "next/link";

const GOLD = "var(--oe-gold, #d7b86e)";
const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

/* Decorado discreto para el hero */
function Glow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-60
                 [background:radial-gradient(80%_60%_at_50%_0%,rgba(215,184,110,0.18),transparent_70%)]"
    />
  );
}

function ChromeText({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-100"
      style={{ WebkitTextStroke: "0.5px rgba(255,255,255,0.25)", textShadow: "0 0 24px rgba(255,255,255,0.15)" }}
    >
      {children}
    </span>
  );
}

/* Hero: titular de marca + claim técnico */
function Hero() {
  return (
    <section className="relative pt-32 pb-14 text-center">
      <Glow />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl px-4"
      >
        <h1 className="text-[40px] md:text-[56px] font-black leading-[1.05] tracking-tight text-white mb-3">
          <ChromeText>Discomóvil profesional</ChromeText>
        </h1>
        <p className="text-white/80 text-lg">
          La pista manda. Tú mandas la pista. Sonido limpio, iluminación dinámica y efectos de escena.
        </p>

        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 backdrop-blur">
            <BadgeCheck className="h-4 w-4" /> Presupuesto cerrado
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 backdrop-blur">
            <Sparkles className="h-4 w-4" /> +150 eventos
          </span>
        </div>
      </motion.div>
    </section>
  );
}

/* Bloques */
function Bloques() {
  const items = [
    {
      icon: Music2,
      title: "Setup y cabina",
      list: ["Sonido limpio", "Iluminación dinámica", "Efectos de escena"],
    },
    {
      icon: Sparkles,
      title: "Selección musical",
      list: ["Temazos recientes", "Mezcla con criterio", "Peticiones en vivo"],
    },
    {
      icon: Lightbulb,
      title: "Reserva",
      list: ["Fechas limitadas", "Propuesta cerrada", "Coordinación de tiempos"],
    },
  ] as const;

  return (
    <section className="relative py-8 md:py-12">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 md:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
          >
            <it.icon className="mb-3 h-8 w-8" style={{ color: GOLD }} />
            <h2 className="mb-2 text-lg font-semibold text-white">{it.title}</h2>
            <ul className="list-disc pl-5 space-y-1 text-white/80">
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

/* CTA final */
function CTA() {
  const phone = "+34699121023";
  const waUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hola Òrbita, quiero reservar la discomóvil."
  )}`;

  return (
    <section className="relative py-16 text-center">
      <div className="mx-auto max-w-2xl px-4">
        <h3 className="text-3xl md:text-5xl font-black text-white mb-3">
          <ChromeText>¿Encendemos la pista?</ChromeText>
        </h3>
        <p className="text-white/70 mb-6">Cuéntanos la fecha y el lugar. Te confirmamos disponibilidad y cerramos propuesta.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-slate-900"
            style={{ backgroundImage: `linear-gradient(to bottom right, ${GOLD}, ${GOLD})` }}
          >
            WhatsApp
          </a>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            Formulario de contacto
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function DiscomovilClient() {
  return (
    <div className="min-h-screen bg-main text-white">
      <Hero />
      <Bloques />
      <CTA />
    </div>
  );
}
