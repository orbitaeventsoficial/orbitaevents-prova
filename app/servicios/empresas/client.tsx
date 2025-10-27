"use client";

import { motion } from "framer-motion";
import { Briefcase, Mic2, BadgeCheck, CalendarCheck, Sparkles } from "lucide-react";
import Link from "next/link";

const GOLD = "var(--oe-gold, #d7b86e)";
const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

/* ChromeText */
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

/* Hero principal */
function Hero() {
  return (
    <section className="relative pt-32 pb-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl px-4"
      >
        <h1 className="text-[40px] md:text-[56px] font-black leading-[1.05] tracking-tight text-white mb-3">
          <ChromeText>Sonido, iluminación y DJ para empresa</ChromeText>
        </h1>
        <p className="text-white/80 text-lg">
          Presentaciones, cócteles y fiestas con protocolo. Microfonía fiable, horarios claros y música a la altura.
        </p>

        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 backdrop-blur">
            <BadgeCheck className="h-4 w-4" /> Producción técnica profesional
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 backdrop-blur">
            <Sparkles className="h-4 w-4" /> Imagen y sonido impecables
          </span>
        </div>
      </motion.div>
    </section>
  );
}

/* Beneficios */
function Beneficios() {
  const items = [
    { icon: Mic2, title: "Voz prioritaria", desc: "Discursos que se entienden. Microfonía preparada y testada." },
    { icon: CalendarCheck, title: "Rigor horario", desc: "Guion técnico y coordinación con producción y espacio." },
    { icon: Sparkles, title: "Imagen cuidada", desc: "Iluminación limpia para marca y ambiente, sin distracciones visuales." },
  ] as const;

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white/80 backdrop-blur"
          >
            <it.icon className="mx-auto mb-3 h-8 w-8" style={{ color: GOLD }} />
            <h3 className="text-lg font-semibold text-white mb-1">{it.title}</h3>
            <p className="text-sm">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* Packs */
function Packs() {
  const packs = [
    {
      name: "Cóctel Pro",
      price: "890 €",
      line: "Sonido ambiental + micro inalámbrico",
      points: [
        "Soportes ocultos y cableado limpio",
        "Playlist o DJ según briefing",
        "Luz cálida para imagen corporativa",
      ],
    },
    {
      name: "Presentación",
      price: "1.290 €",
      line: "Sonido distribuido + 2 micros + técnico",
      points: [
        "Revisión del guion técnico",
        "Grabación básica si es necesaria",
        "Escenas de luz predefinidas",
      ],
      featured: true,
    },
    {
      name: "Fiesta Team",
      price: "1.690 €",
      line: "DJ + sonido e iluminación de pista",
      points: [
        "Selección musical a medida",
        "Efectos moderados y elegantes",
        "Horarios pactados y coordinados",
      ],
    },
  ] as const;

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl md:text-5xl font-black text-center text-white mb-12">
          <ChromeText>Packs para empresa</ChromeText>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {packs.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cx(
                "relative rounded-3xl border p-6 backdrop-blur",
                (p as any).featured
                  ? "border-amber-300/30 bg-gradient-to-br from-amber-300/10 via-white/5 to-amber-500/10 shadow-[0_14px_40px_rgba(255,200,0,0.12)]"
                  : "border-white/10 bg-white/5"
              )}
            >
              {(p as any).featured && (
                <div
                  className="absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-bold text-slate-900 shadow"
                  style={{ backgroundImage: `linear-gradient(to bottom right, ${GOLD}, ${GOLD})` }}
                >
                  Más solicitado
                </div>
              )}
              <h3 className="text-xl font-bold text-white">{p.name}</h3>
              <p className="mt-1 text-sm text-white/70">{p.line}</p>
              <div className="mt-6 text-4xl font-black text-white">{p.price}</div>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {p.points.map((pt, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5" style={{ color: GOLD }} /> {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-center text-white/60 text-sm">
          Presupuestos orientativos. Confirmaremos según espacio y necesidades.
        </p>
      </div>
    </section>
  );
}

/* CTA */
function CTA() {
  const phone = "+34699121023";
  const waUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hola Òrbita, quiero información para un evento de empresa."
  )}`;

  return (
    <section className="relative py-20 text-center">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-3">
          <ChromeText>Hablemos de tu evento</ChromeText>
        </h2>
        <p className="text-white/70 mb-6">
          Fecha, horarios y formato. Nos coordinamos con producción y tú te quedas tranquilo.
        </p>
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

/* Export principal */
export default function EmpresaClient() {
  return (
    <div className="min-h-screen bg-main text-white">
      <Hero />
      <Beneficios />
      <Packs />
      <CTA />
    </div>
  );
}
