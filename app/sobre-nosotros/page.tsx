// app/servicios/client.tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Music, Mic2, Lightbulb, Briefcase, Wrench, Package } from "lucide-react";

export default function ServiciosClient() {
  const shouldReduceMotion = useReducedMotion();

  const servicios = [
    {
      name: "Discomóvil",
      href: "/servicios/discomobil",
      desc: "Equipo completo de sonido y luz para que la fiesta soni bé, sense cablejat salvatge ni invents raros.",
      icon: Music,
    },
    {
      name: "Bodas",
      href: "/servicios/bodas",
      desc: "Cerimònia clara, còctel amb bon ambient i festa on ballen fins i tot els cunyats. Sense karaoke accidental.",
      icon: Mic2,
    },
    {
      name: "Fiestas",
      href: "/servicios/fiestas",
      desc: "Cumples, despedides i liades diverses amb DJ que llegeix la pista, no una playlist en aleatori.",
      icon: Lightbulb,
    },
    {
      name: "Empresas",
      href: "/servicios/empresas",
      desc: "Esdeveniments corporatius seriosos en tècnica i relaxats en ambient. Presentacions, sopars i equips que no pateixen.",
      icon: Briefcase,
    },
    {
      name: "Producción técnica",
      href: "/servicios/produccion",
      desc: "Muntatge, patch i operació perquè tot funcioni i ningú hagi de tocar una regleta en mig de l’acte.",
      icon: Wrench,
    },
    {
      name: "Alquiler",
      href: "/servicios/alquiler",
      desc: "Equips llestos per endollar o amb tècnic si no vols barallar-te amb la taula. Sense sorpreses.",
      icon: Package,
    },
  ] as const;

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  } satisfies Variants;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 text-white">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          Servicios sin humo (del malo)
        </h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Tècnica cuidada, muntatge net i events que funcionen. Tu demanes, nosaltres ho fem decent.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {servicios.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.href}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="group oe-card p-6 rounded-3xl transition-all duration-300 hover:border-[#d7b86e]/30 hover:shadow-[0_0_0_1px_rgba(215,184,110,.25),0_12px_40px_rgba(215,184,110,.15)]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <Icon className="w-6 h-6 text-[#d7b86e]" />
                </div>
                <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#d7b86e] group-hover:translate-x-1 transition-all duration-300" />
              </div>

              <h2 className="text-xl font-bold mb-2">{s.name}</h2>
              <p className="text-sm text-white/70 mb-5 leading-relaxed">{s.desc}</p>

              <Link
                href={s.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#d7b86e] hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d7b86e]"
                aria-label={`Ver detalles del servicio ${s.name}`}
              >
                Ver servicio
                <span className="sr-only"> sobre {s.name}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
