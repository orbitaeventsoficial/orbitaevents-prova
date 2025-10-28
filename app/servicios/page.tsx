// app/servicios/client.tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function ServiciosClient() {
  const reduce = useReducedMotion();
  const servicios = [
    { name: "Discomóvil", href: "/servicios/discomobil", desc: "Sonido, luz y cabina con criterio." },
    { name: "Bodas", href: "/servicios/bodas", desc: "Ceremonia clara, cóctel elegante y fiesta sólida." },
    { name: "Fiestas", href: "/servicios/fiestas", desc: "Cumples y privadas sin cableado salvaje." },
    { name: "Empresas", href: "/servicios/empresas", desc: "Eventos corporativos sin sustos técnicos." },
    { name: "Producción técnica", href: "/servicios/produccion", desc: "Montaje, patch y operación serios." },
    { name: "Alquiler", href: "/servicios/alquiler", desc: "Packs listos o con técnico, como toca." }
  ] as const;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-white">
      <h1 className="mb-8 text-3xl font-black md:text-5xl">Servicios</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {servicios.map((s, i) => (
          <motion.div
            key={s.href}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
          >
            <h2 className="text-xl font-bold">{s.name}</h2>
            <p className="mt-1 text-white/75 text-sm">{s.desc}</p>
            <div className="mt-4">
              <Link
                href={s.href}
                className="inline-flex items-center rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10"
              >
                Ver servicio
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
