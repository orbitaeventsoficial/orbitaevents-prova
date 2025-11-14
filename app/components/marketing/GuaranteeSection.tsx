// app/components/marketing/GuaranteeSection.tsx
"use client";

import { motion } from "framer-motion";
import { Shield, Heart, TrendingUp, Clock, Users, CheckCircle2 } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "94%",
    label: "Los mejores temazos",
  },
  {
    icon: Clock,
    value: "4.8h",
    label: "Duración media del evento",
  },
  {
    icon: Users,
    value: "92%",
    label: "Repiten o recomiendan",
  },
];

const commitments = [
  "Equipo técnico y humano preparado para cualquier imprevisto",
  "Supervisión personalizada desde la reserva hasta el último tema",
  "Equipamiento de respaldo en cabina, sonido e iluminación",
  "Contrato y factura digitales al momento",
  "Comunicación directa y disponibilidad total antes del evento",
];

export default function GuaranteeSection() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-surface to-bg-main">
      <div className="mx-auto max-w-6xl px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-oe-gold/10 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <Heart className="w-10 h-10 text-oe-gold" />
          </motion.div>

          <h2 className="text-h2 text-white mb-4">
            Compromiso de Excelencia
            <br />
            <span className="text-oe-gold">Tu tranquilidad, nuestra prioridad</span>
          </h2>

          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            En cada boda nos implicamos como si fuera propia: planificamos al detalle, preparamos soluciones de respaldo
            y cuidamos el ritmo para que la pista esté viva toda la noche.
            <span className="text-oe-gold font-bold">Tu satisfacción no es una promesa, es nuestro estándar</span>.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                className="oe-card text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Icon className="w-10 h-10 text-oe-gold mx-auto mb-4" />
                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                <p className="text-sm text-text-muted">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Commitments List */}
        <motion.div
          className="oe-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-oe-gold" />
            <h3 className="text-2xl font-bold text-white">Nuestro compromiso contigo</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {commitments.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3 text-white"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <CheckCircle2 className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
            <p className="text-sm text-green-400 text-center">
              ✅ Más de 150 celebraciones ejecutadas con éxito y valoración media sobresaliente.
            </p>
          </div>
        </motion.div>

        <p className="text-sm text-text-muted text-center mt-8">
          * Compromiso válido siguiendo recomendaciones básicas de espacio, horario y público.
        </p>
      </div>
    </section>
  );
}
