"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Lightbulb, Speaker, Wind, Clock3, Crown, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

const GOLD = "var(--oe-gold, #d7b86e)";

function ChromeText({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-block bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-100"
      style={{
        WebkitTextStroke: "0.5px rgba(255,255,255,0.25)",
        textShadow: "0 0 24px rgba(255,255,255,0.15)"
      }}
    >
      {children}
    </span>
  );
}

/* HERO */
function Hero() {
  return (
    <section className="relative pt-32 pb-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl px-4"
      >
        <h1 className="mb-3 text-[40px] font-black leading-[1.05] tracking-tight text-white md:text-[56px]">
          <ChromeText>Packs y tarifas</ChromeText>
        </h1>
        <p className="text-lg text-white/80">
          Precio cerrado y montaje incluido. Elige el nivel que encaja con tu evento y amplía si lo necesitas.
        </p>
      </motion.div>
    </section>
  );
}

/* Tipado explícito para que 'best' exista en todos como opcional */
type Pack = {
  name: string;
  icon: LucideIcon;
  price: string;
  bullets: readonly string[];
  extras: readonly string[];
  best?: boolean;
};

const PACKS: readonly Pack[] = [
  {
    name: "Esencial",
    icon: Speaker,
    price: "desde 490 €",
    bullets: ["50–100 personas", "Sonido + luz cálida", "DJ hasta 4 h"],
    extras: ["Humo suave", "Micrófono inalámbrico", "Montaje y prueba incluidos"]
  },
  {
    name: "Avanzado",
    icon: Lightbulb,
    price: "desde 790 €",
    bullets: ["100–200 personas", "Subgrave y efectos", "DJ hasta 5 h"],
    extras: ["Máquina de humo", "Cabina iluminada", "Operador técnico durante el evento"],
    best: true
  },
  {
    name: "Premium",
    icon: Crown,
    price: "desde 1090 €",
    bullets: ["200+ personas", "PA extendido y luz programada", "DJ hasta 6 h"],
    extras: ["Estructura truss", "Láser y hazes", "Diseño de escenas personalizado"]
  }
] as const;

/* PACKS */
function Packs() {
  const reduce = useReducedMotion();
  return (
    <section className="relative py-12">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
        {PACKS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className={`rounded-3xl border bg-white/5 p-6 text-white backdrop-blur ${
              p.best ? "border-white/30" : "border-white/10"
            }`}
          >
            <div className="mb-2 flex items-center gap-2">
              <p.icon className="h-7 w-7" style={{ color: GOLD }} aria-hidden />
              <h3 className="text-xl font-semibold">{p.name}</h3>
            </div>
            <div className="mb-3 text-2xl font-bold">{p.price}</div>
            <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-white/80">
              {p.bullets.map(b => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="my-3 border-t border-white/10" />
            <ul className="list-none space-y-1 text-sm text-white/70">
              {p.extras.map(e => (
                <li key={e}>• {e}</li>
              ))}
            </ul>
            <div className="mt-6 flex gap-2">
              <Link
                href="/contacto"
                className="inline-flex items-center rounded-xl border border-white/20 px-4 py-2 font-medium text-white hover:bg-white/10"
                data-label={`packs_${p.name.toLowerCase()}`}
              >
                Pide presupuesto
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center rounded-xl px-4 py-2 font-semibold text-slate-900"
                style={{ backgroundImage: `linear-gradient(to bottom right, ${GOLD}, ${GOLD})` }}
              >
                Reserva
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* CONDICIONES */
function Condiciones() {
  const blocks = [
    {
      icon: Clock3,
      title: "Duración",
      desc: "Tiempo base incluido: 4 a 6 h según pack. Se puede ampliar por tramos horarios."
    },
    {
      icon: Wind,
      title: "Transporte",
      desc: "Incluido en Granollers y Cànoves. Resto de zonas con suplemento por km."
    },
    {
      icon: Sparkles,
      title: "Extras",
      desc: "Cabina iluminada, humo, proyector o micro extra se pueden añadir a cualquier pack."
    }
  ] as const;
  const reduce = useReducedMotion();
  return (
    <section className="relative py-12">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
        {blocks.map((b, i) => (
          <motion.div
            key={b.title}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/80 backdrop-blur"
          >
            <b.icon className="mb-2 h-6 w-6" style={{ color: GOLD }} aria-hidden />
            <h4 className="mb-1 text-white font-semibold">{b.title}</h4>
            <p className="text-sm">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* CTA FINAL */
function CTAfinal() {
  const phone = "+34699121023";
  const waUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hola Òrbita, quiero información sobre los packs."
  )}`;
  return (
    <section className="relative py-20 text-center">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="mb-3 text-3xl font-black text-white md:text-5xl">
          <ChromeText>¿Qué tipo de evento tienes?</ChromeText>
        </h2>
        <p className="mb-6 text-white/70">
          Cuéntanos lugar, fecha y horario. Te enviamos disponibilidad y precio exacto.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={waUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-slate-900"
            style={{ backgroundImage: `linear-gradient(to bottom right, ${GOLD}, ${GOLD})` }}
          >
            WhatsApp directo
          </a>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            Formulario
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function PacksClient() {
  return (
    <div className="min-h-screen bg-main text-white">
      <Hero />
      <Packs />
      <Condiciones />
      <CTAfinal />
    </div>
  );
}
