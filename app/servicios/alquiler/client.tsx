"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Lightbulb, Speaker, Sparkles } from "lucide-react";

/* ===== JSON-LD de packs de alquiler ===== */
function JsonLD() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://orbitaevents.cat";

  // 31 de diciembre del año en curso (YYYY-MM-DD)
  const priceValidUntil = new Date(new Date().getFullYear(), 11, 31)
    .toISOString()
    .slice(0, 10);

  const json = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          name: "Pack Básico Sonido + Luz",
          description:
            "Sistema compacto para pisos o terrazas pequeñas. Sonido nítido y luz cálida.",
          brand: { "@type": "Brand", name: "Òrbita Events" },
          url: `${base}/servicios/alquiler#pack-basico`,
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: "79",
            availability: "https://schema.org/InStock",
            url: `${base}/contacto`,
            priceValidUntil
          }
        }
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          name: "Pack Estándar Fiesta",
          description:
            "Para 50–120 pax. Sonido con subgrave y luz con efectos moderados.",
          brand: { "@type": "Brand", name: "Òrbita Events" },
          url: `${base}/servicios/alquiler#pack-estandar`,
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: "149",
            availability: "https://schema.org/InStock",
            url: `${base}/contacto`,
            priceValidUntil
          }
        }
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Product",
          name: "Pack Pro Evento",
          description:
            "Para 120–250 pax. PA con pegada, luz diseñada y humo controlado.",
          brand: { "@type": "Brand", name: "Òrbita Events" },
          url: `${base}/servicios/alquiler#pack-pro`,
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: "289",
            availability: "https://schema.org/InStock",
            url: `${base}/contacto`,
            priceValidUntil
          }
        }
      }
    ]
  } as const;

  const payload = JSON.stringify(json);

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}

/* ===== CONTENIDO VISUAL ===== */
export default function AlquilerClient() {
  const reduce = useReducedMotion();

  const packs = [
    {
      id: "pack-basico",
      icon: Speaker,
      title: "Pack Básico Sonido + Luz",
      desc: "Ideal para pisos o terrazas pequeñas. Incluye altavoces activos, luz cálida y cableado.",
      price: "79 €",
    },
    {
      id: "pack-estandar",
      icon: Lightbulb,
      title: "Pack Estándar Fiesta",
      desc: "Para 50–120 pax. Sonido con subgrave, efectos moderados y set listo para conectar.",
      price: "149 €",
    },
    {
      id: "pack-pro",
      icon: Sparkles,
      title: "Pack Pro Evento",
      desc: "PA con pegada, luz diseñada, máquina de humo y control técnico si se requiere.",
      price: "289 €",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-main text-white">
      <JsonLD />

      <section className="relative py-20 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-4 text-4xl font-black md:text-5xl">
            Alquiler y producción técnica
          </h1>
          <p className="text-white/70 mb-8">
            Equipos de sonido, luces y efectos con recogida o montaje
            profesional. Servicio completo y mantenimiento incluido.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3">
          {packs.map((p, i) => (
            <motion.div
              key={p.id}
              id={p.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur text-left"
            >
              <p.icon
                className="mb-3 h-8 w-8"
                style={{ color: "var(--oe-gold,#d7b86e)" }}
                aria-hidden
              />
              <h2 className="mb-2 text-lg font-semibold text-white">{p.title}</h2>
              <p className="mb-4 text-sm text-white/75">{p.desc}</p>
              <div className="text-lg font-bold text-[#d7b86e]">{p.price}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Abrir formulario de contacto"
          >
            Solicitar presupuesto
          </Link>
          <Link
            href="https://wa.me/34699121023?text=Hola%20Òrbita,%20quiero%20información%20sobre%20los%20packs%20de%20alquiler."
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-slate-900 bg-gradient-to-br from-[#f1d99c] via-[#e9c87a] to-[#d7b86e] shadow-[0_8px_40px_rgba(215,184,110,0.25)] transition hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Abrir WhatsApp para solicitar información"
          >
            WhatsApp
          </Link>
        </div>
      </section>
    </div>
  );
}
