"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Lightbulb, Speaker, Wind, Clock3, Crown } from "lucide-react";

const GOLD = "var(--oe-gold, #d7b86e)";

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
        <h1 className="text-[40px] md:text-[56px] font-black leading-[1.05] tracking-tight text-white mb-3">
          <ChromeText>Packs y tarifas</ChromeText>
        </h1>
        <p className="text-white/80 text-lg">
          Precio cerrado y montaje incluido. Elige el nivel que encaja con tu evento y amplía si lo necesitas.
        </p>
      </motion.div>
    </section>
  );
}

const PACKS = [
  {
    name: "Esencial",
    icon: Speaker,
    price: "desde 490 €",
    bullets: ["50–100 personas", "Sonido + luz cálida", "DJ hasta 4 h"],
    extras: ["Humo suave", "Micrófono inalámbrico", "Montaje y prueba incluidos"],
  },
  {
    name: "Avanzado",
    icon: Lightbulb,
    price: "desde 790 €",
    bullets: ["100–200 personas", "Subgrave y efectos", "DJ hasta 5 h"],
    extras: ["Máquina de humo", "Cabina iluminada", "Operador técnico durante el evento"],
    best: true,
  },
  {
    name: "Premium",
    icon: Crown,
    price: "desde 1090 €",
    bullets: ["200+ personas", "PA extendido y luz programada", "DJ hasta 6 h"],
    extras: ["Estructura truss", "Láser y hazes", "Diseño de escenas personalizado"],
  },
] as const;

/* PACKS */
function Packs() {
  const reduce = useReducedMotion();
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-6xl px-4 grid gap-6 md:grid-cols-3">
        {PACKS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className={`rounded-3xl border bg-white/5 backdrop-blur p-6 text-white ${
              p.best ? "border-white/30" : "border-white/10"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <p.icon className="h-7 w-7" style={{ color: GOLD }} aria-hidden />
              <h3 className="text-xl font-semibold">{p.name}</h3>
            </div>
            <div className="text-2xl font-bold mb-3">{p.price}</div>
            <ul className="list-disc pl-5 text-sm text-white/80 space-y-1 mb-4">
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="border-t border-white/10 my-3"></div>
            <ul className="list-none space-y-1 text-sm text-white/70">
              {p.extras.map((e) => (
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
      desc: "Tiempo base incluido: 4 a 6 h según pack. Se puede ampliar por tramos horarios.",
    },
    {
      icon: Wind,
      title: "Transporte",
      desc: "Incluido en Granollers y Cànoves. Resto de zonas con suplemento por km.",
    },
    {
      icon: Sparkles,
      title: "Extras",
      desc: "Cabina iluminada, humo, proyector o micro extra se pueden añadir a cualquier pack.",
    },
  ];
  const reduce = useReducedMotion();
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-3 gap-6">
        {blocks.map((b, i) => (
          <motion.div
            key={b.title}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/80 backdrop-blur"
          >
            <b.icon className="h-6 w-6 mb-2" style={{ color: GOLD }} aria-hidden />
            <h4 className="text-white font-semibold mb-1">{b.title}</h4>
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
        <h2 className="text-3xl md:text-5xl font-black text-white mb-3">
          <ChromeText>¿Qué tipo de evento tienes?</ChromeText>
        </h2>
        <p className="text-white/70 mb-6">
          Cuéntanos lugar, fecha y horario. Te enviamos disponibilidad y precio exacto.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
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
