import ChromeText from '../../components/ui/ChromeText';
import { BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from '@/components/Section'
import clsx from 'clsx';

const defaultItems = [
  {
    title: "Estrategia",
    description: "Diseño de experiencias y cronos con cabeza",
    icon: BadgeCheck,
    bullets: ["Plan de objetivos", "Calendario realista", "KPIs aceptables"]
  },
  {
    title: "Producción",
    description: "Escenografía, riders y logística que existen",
    icon: BadgeCheck,
    bullets: ["Proveedores verificables", "Presus sin humo", "Plan B de verdad"]
  },
  {
    title: "Técnica",
    description: "Luz, sonido y vídeo sin sustos",
    icon: BadgeCheck,
    bullets: ["Riders claros", "Pruebas y backup", "Operativa en venue"]
  },
  {
    title: "Creatividad",
    description: "Conceptos que no dan vergüenza ajena",
    icon: BadgeCheck,
    bullets: ["Idea > adorno", "Copy que se entiende", "Visual que sostiene"]
  },
  {
    title: "Operativa",
    description: "Timing, staff y permisos en regla",
    icon: BadgeCheck,
    bullets: ["Crono detallado", "Roles y responsables", "Permisos al día"]
  },
] as const;

const items = defaultItems;

// Valor por defecto: si algún día declaras 'items' real arriba o lo recibes vía props,
// cámbialo. Mientras tanto, compila y funciona.
const items = defaultItems;

export const metadata = {
  title: 'Serveis — Òrbita Events',
  description: 'DJ, so, llum i producció per a bodes, empresa i festes',
}

export default function Page(){
  return (
    <main className="container mx-auto px-4">
      <Section title="Serveis" subtitle="DJ, tècnica, llum i animació">
        <div className="prose max-w-none">
          <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-end justify-between gap-6">
          <h2 className="text-3xl md:text-5xl font-black text-white">
            <ChromeText>Servicios de discomóvil para bodas en Barcelona</ChromeText>
          </h2>
          <p className="hidden md:block text-white/70 text-sm max-w-md">
            DJ para bodas, fiestas privadas, eventos de empresa y alquiler de equipos en Barcelona y alrededores.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-4 md:gap-6 items-stretch">
          {items.map((it, i) => (
            <motion.article
              key={it.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={clsx(
                "group relative h-full rounded-2xl p-5 md:p-6",
                "border border-white/12 bg-white/[0.045] backdrop-blur",
                "hover:border-white/20 hover:bg-white/[0.06] transition"
              )}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition [background:radial-gradient(80%_120%_at_50%_0%,rgba(255,215,128,0.06),transparent_70%)]"
                aria-hidden
              />

              <div className="flex items-center gap-2 text-white">
                <it.icon className="size-5 md:size-6 shrink-0 opacity-90" />
                <h3 className="font-bold text-base md:text-lg tracking-tight">{it.title}</h3>
              </div>

              <p className="mt-2 text-white/75 text-sm leading-relaxed">{it.description}</p>

              <ul className="mt-4 space-y-1.5 text-white/80 text-sm">
                {it.bullets?.map((b, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <BadgeCheck className="size-5 opacity-90" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <a
                  href={it.cta.href}
                  onClick={() => trackEvent("click_card_servicio", { servicio: it.title })}
                  className="inline-flex w-full justify-center rounded-xl border border-white/20 px-4 py-2 font-medium text-white hover:bg-white/10 transition"
                  aria-label={`${it.title} · ${it.k}`}
                  title={it.k}
                >
                  {it.cta.label}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
        </div>
      </Section>

      <Section title="Packs" subtitle="Opcions clares amb tot inclòs">
        <div className="prose max-w-none">
          <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between gap-6">
          <h2 className="text-3xl md:text-5xl font-black text-white">
            <ChromeText>Packs de DJ para bodas, fiestas y empresa</ChromeText>
          </h2>
          <p className="hidden md:block text-white/70 text-sm max-w-md">
            Opciones claras y cerradas. Elige tu formato y reserva.
          </p>
        </div>

        {/* selector opcional
        <div className="mb-6 flex gap-2">
          {MODES.map(m => (
            <button key={m} onClick={() => setMode(m)} className={clsx("rounded-xl px-3 py-1 text-sm border", mode===m ? "border-amber-300 text-white" : "border-white/20 text-white/70")}>{m}</button>
          ))}
        </div> */}

        <div className="grid md:grid-cols-3 gap-6 items-stretch auto-rows-fr">
          {packs.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className={clsx(
                "relative h-full rounded-3xl border p-6 backdrop-blur",
                (p as any).featured
                  ? "border-amber-300/30 bg-gradient-to-br from-amber-300/10 via-white/5 to-amber-500/10 shadow-[0_14px_40px_rgba(255,200,0,0.12)]"
                  : "border-white/10 bg-white/5"
              )}
            >
              {(p as any).featured && (
                <div className="absolute -top-3 left-6 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 px-3 py-1 text-xs font-bold text-slate-900 shadow">
                  Más pedido
                </div>
              )}
              <h3 className="text-xl font-bold text-white">{p.name}</h3>
              <p className="mt-1 text-sm text-white/70">{p.line}</p>
              <div className="mt-6 text-4xl font-black text-white">{p.price}</div>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {p.points.map((pt, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <BadgeCheck className="size-5" /> {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <a
                  href="#reserva"
                  onClick={() => trackEvent("click_reservar_fecha", { location: "packs", pack: p.name })}
                  className="inline-flex w-full justify-center rounded-xl border border-white/20 px-4 py-2 font-medium text-white hover:bg-white/10 transition"
                >
                  Reservar
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
        </div>
      </Section>

      <Section title="Preguntes freqüents" subtitle="Respostes ràpides">
        <div className="prose max-w-none">
          <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-3xl md:text-5xl font-black text-white">
          <ChromeText>Preguntas frecuentes</ChromeText>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur open:bg-white/7 transition"
            >
              <summary className="list-none cursor-pointer select-none text-white font-semibold flex items-center justify-between">
                {f.q}
                <span className="ml-3 inline-flex size-6 items-center justify-center rounded-md border border-white/20 text-white/70 group-open:rotate-45 transition">
                  +
                </span>
              </summary>
              <p className="mt-3 text-white/70 text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
        </div>
      </Section>
    </main>
  )
}









