// app/servicios/discomobil/client.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Music2, Sparkles, Lightbulb, BadgeCheck } from "lucide-react";
import Link from "next/link";

const GOLD = "var(--oe-gold, #d7b86e)";
const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

/* Decorado discreto para el hero: sin blur, solo radial sutil */
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
      style={{ WebkitTextStroke: "0.5px rgba(255,255,255,0.25)", textShadow: "0 0 14px rgba(255,255,255,0.12)" }}
    >
      {children}
    </span>
  );
}

/* Hero */
function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative pt-28 md:pt-32 pb-12 text-center oe-section">
      <Glow />
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={reduce ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-3xl"
      >
        <h1 className="text-[40px] md:text-[56px] font-black leading-[1.05] tracking-tight text-white mb-3">
          <ChromeText>Discomóvil profesional</ChromeText>
        </h1>
        <p className="text-white/80 text-lg">
          La pista manda. Tú mandas la pista. Sonido limpio, iluminación dinámica y efectos de escena.
        </p>

        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[color:var(--bg-surface)] px-3 py-1 text-sm text-white/80">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" /> Presupuesto cerrado
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[color:var(--bg-surface)] px-3 py-1 text-sm text-white/80">
            <Sparkles className="h-4 w-4" aria-hidden="true" /> +150 eventos
          </span>
        </div>
      </motion.div>
    </section>
  );
}

/* Bloques: sin backdrop-blur ni bg-white/5. Usa oe-card coherente */
function Bloques() {
  const reduce = useReducedMotion();
  const items = [
    { icon: Music2, title: "Setup y cabina", list: ["Sonido limpio", "Iluminación dinámica", "Efectos de escena"] },
    { icon: Sparkles, title: "Selección musical", list: ["Temazos recientes", "Mezcla con criterio", "Peticiones en vivo"] },
    { icon: Lightbulb, title: "Reserva", list: ["Fechas limitadas", "Propuesta cerrada", "Coordinación de tiempos"] }
  ] as const;

  return (
    <section className="relative py-10 md:py-14 oe-section">
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <motion.article
            key={it.title}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" }}
            className="oe-card p-5"
          >
            <it.icon className="mb-3 h-8 w-8" style={{ color: GOLD }} aria-hidden="true" />
            <h2 className="mb-2 text-lg font-semibold text-white">{it.title}</h2>
            <ul className="list-disc pl-5 space-y-1 text-white/80">
              {it.list.map(li => <li key={li}>{li}</li>)}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* CTA final */
function CTA() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_E164 || "+34699121023";
  const waUrl =
    `https://wa.me/${phone.replace(/\D/g, "")}?text=` +
    encodeURIComponent("Hola Òrbita, quiero reservar la discomóvil.") +
    "&utm_source=site&utm_medium=cta&utm_campaign=servicio_discomovil";

  return (
    <section className="relative py-16 text-center oe-section">
      <div className="mx-auto max-w-2xl">
        <h3 className="text-3xl md:text-5xl font-black text-white mb-3">
          <ChromeText>¿Encendemos la pista?</ChromeText>
        </h3>
        <p className="text-white/70 mb-6">
          Cuéntanos la fecha y el lugar. Te confirmamos disponibilidad y cerramos propuesta.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener nofollow"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-slate-900"
            style={{ backgroundImage: `linear-gradient(to bottom right, ${GOLD}, ${GOLD})` }}
            data-evt="cta_discomovil_wa"
          >
            WhatsApp
          </a>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10"
            data-evt="cta_discomovil_form"
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
    // Nada de bg-black aquí: el fondo ya lo aporta el layout con --bg-main.
    <div className="min-h-screen text-white">
      <Hero />
      <Bloques />
      <CTA />
    </div>
  );
}
