"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import {
  Music2,
  PartyPopper,
  Lightbulb,
  BadgeCheck,
  CalendarCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// Carga del portal de logo en diferido para no competir con el LCP
const PortalLazy = dynamic(() => import("./ui/HeroPortalLogo.client"), { ssr: false });

const GOLD = "#d7b86e";

/* requestIdleCallback: tipado y fallback cross-browser, sin @ts-ignore */
type IdleId = number;
type IdleCb = (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void;

function requestIdle(cb: IdleCb, timeout = 600): IdleId {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    // @ts-expect-error TS no tipa bien en dom lib antigua
    return window.requestIdleCallback(cb, { timeout }) as IdleId;
  }
  const start = Date.now();
  return window.setTimeout(() => {
    cb({
      didTimeout: Date.now() - start >= timeout,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
    });
  }, 1) as IdleId;
}
function cancelIdle(id?: IdleId) {
  if (!id) return;
  if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
    // @ts-expect-error idem
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}

/* Utilidad CSS */
const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

/* ChromeText */
function ChromeText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "inline-block bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-100",
        className
      )}
      style={{
        WebkitTextStroke: "0.5px rgba(255,255,255,0.25)",
        textShadow: "0 0 24px rgba(255,255,255,0.15)",
      }}
    >
      {children}
    </span>
  );
}

/* Badges del hero */
function Badge({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 backdrop-blur">
      <Icon className="h-4 w-4" aria-hidden />
      {children}
    </div>
  );
}

/* CTA dorado con A11Y y data-attribute para analítica */
function CtaGold({ href, children }: { href: string; children: React.ReactNode }) {
  const label = typeof children === "string" ? `Ir a ${children}` : "Abrir sección";
  return (
    <Link
      href={href}
      aria-label={label}
      data-cta="primary"
      className={cx(
        "inline-flex items-center justify-center rounded-2xl px-5 py-2 font-semibold text-slate-900",
        "bg-gradient-to-br from-[#f1d99c] via-[#e9c87a] to-[#d7b86e]",
        "shadow-[0_8px_40px_rgba(215,184,110,0.25)] hover:scale-[1.02] active:scale-[0.98] transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      )}
    >
      {children}
    </Link>
  );
}

/* SEO JSON-LD (WebSite + Organization), con payload memoizado y suppressHydrationWarning */
function JsonLD() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://orbitaevents-prova.vercel.app";

  const payload = useMemo(
    () =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            name: "Òrbita Events",
            url: base,
            potentialAction: {
              "@type": "SearchAction",
              target: `${base}/?s={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@type": "Organization",
            name: "Òrbita Events",
            url: base,
            // añade también un PNG para parsers más básicos
            logo: `${base}/img/brand/logo.png`,
            sameAs: [
              "https://www.instagram.com/orbitaevents",
              "https://www.facebook.com/orbitaevents",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+34 699 121 023",
              contactType: "customer service",
              areaServed: "ES",
              availableLanguage: ["es", "ca"],
            },
          },
        ],
      }),
    [base]
  );

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}

/* HERO */
function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate pt-28 md:pt-36 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background:radial-gradient(80%_60%_at_50%_0%,rgba(215,184,110,0.18),transparent_70%)]"
      />
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl px-4"
      >
        <div className="flex justify-center mb-5">
          {/* Decorativo, que no hable en el árbol accesible */}
          <svg width="72" height="72" aria-hidden className="opacity-90">
            <circle cx="36" cy="36" r="34" stroke={GOLD} strokeWidth="2" fill="none" />
          </svg>
        </div>

        <h1 className="text-[40px] md:text-[56px] font-black leading-[1.05] tracking-tight text-white mb-3">
          <ChromeText>Técnica, música y emoción con criterio.</ChromeText>
        </h1>

        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Producción técnica, discomóvil y bodas. Sonido limpio, luz precisa y ritmo medido para que todo fluya.
        </p>

        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <Badge icon={BadgeCheck}>Presupuesto cerrado</Badge>
          <Badge icon={CalendarCheck}>Fechas limitadas</Badge>
          <Badge icon={Sparkles}>+150 eventos</Badge>
        </div>

        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <CtaGold href="/servicios/discomobil">Discomóvil</CtaGold>
          <CtaGold href="/servicios/bodas">Bodas</CtaGold>
          <CtaGold href="/servicios/produccion">Producción técnica</CtaGold>
        </div>
      </motion.div>
    </section>
  );
}

/* SERVICIOS DESTACADOS */
const FEATURED = [
  {
    icon: Music2,
    title: "Discomóvil profesional",
    desc: "Cabina, sonido e iluminación equilibrada para cualquier espacio.",
    href: "/servicios/discomobil",
  },
  {
    icon: PartyPopper,
    title: "Bodas que se viven",
    desc: "Ceremonia clara, cóctel elegante y fiesta con energía real.",
    href: "/servicios/bodas",
  },
  {
    icon: Lightbulb,
    title: "Producción técnica",
    desc: "Montaje y operación con criterio. Sin técnica no hay magia.",
    href: "/servicios/produccion",
  },
] as const;

function Servicios() {
  const reduce = useReducedMotion();
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-12 text-3xl md:text-5xl font-black text-center text-white">
          <ChromeText>Servicios profesionales</ChromeText>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURED.map((it, i) => (
            <motion.div
              key={it.title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md hover:border-white/20 hover:bg-white/[0.08] transition"
            >
              <it.icon className="mx-auto mb-4 h-10 w-10" style={{ color: GOLD }} aria-hidden />
              <h3 className="text-xl font-bold text-white mb-2">{it.title}</h3>
              <p className="text-white/75 text-sm mb-5">{it.desc}</p>
              <CtaGold href={it.href}>Ver servicio</CtaGold>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* OPINIONES */
function Opiniones() {
  const reviews = [
    { name: "Laura & Marc", text: "Todo perfecto: ceremonia, cóctel y una fiesta increíble." },
    { name: "Núria", text: "Entendieron nuestro estilo y clavaron la música y la iluminación." },
    { name: "Jordi & Paula", text: "Trato cercano, sonido impecable y una pista encendida." },
  ] as const;
  const reduce = useReducedMotion();
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-5xl font-black text-center text-white mb-12">
          <ChromeText>Opiniones reales</ChromeText>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.blockquote
              key={r.name}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur text-white/80"
            >
              <p className="text-sm mb-3 italic">“{r.text}”</p>
              <footer className="font-semibold text-white">— {r.name}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CTA FINAL */
function Reserva() {
  const phone = "+34699121023";
  const waMsg = "Hola Òrbita, quiero información y disponibilidad.";
  const waUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    waMsg
  )}&utm_source=web&utm_medium=cta_home&utm_campaign=whatsapp`;

  return (
    <section className="relative py-20 text-center">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-3">
          <ChromeText>Contacto y reservas</ChromeText>
        </h2>
        <p className="text-white/70 mb-6">
          Indícanos fecha, lugar y tipo de evento. Te respondemos con disponibilidad y presupuesto cerrado.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-slate-900 bg-gradient-to-br from-[#f1d99c] via-[#e9c87a] to-[#d7b86e] shadow-[0_8px_40px_rgba(215,184,110,0.25)] hover:scale-[1.02] active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Abrir conversación de WhatsApp para solicitar disponibilidad"
          >
            WhatsApp
          </a>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Abrir formulario de contacto"
          >
            Formulario
          </Link>
        </div>
      </div>
    </section>
  );
}

/* EXPORT FINAL con portal en diferido, sin colarse en el LCP */
export default function AppLanding() {
  const reduce = useReducedMotion();
  const [showPortal, setShowPortal] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const timeoutId = window.setTimeout(() => setShowPortal(true), 150);
    const idleId = requestIdle(() => setShowPortal(true), 600);
    return () => {
      clearTimeout(timeoutId);
      cancelIdle(idleId);
    };
  }, [reduce]);

  return (
    <div className="min-h-screen bg-main text-white">
      <JsonLD />
      {showPortal && (
        <PortalLazy
          endColor="#0a0a0b"
          totalMs={7600}
          fadeMs={2800}
          introHoldMs={800}
          introFadeMs={1400}
        />
      )}
      <Hero />
      <Servicios />
      <Opiniones />
      <Reserva />
    </div>
  );
}
