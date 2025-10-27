"use client";

import { useEffect, useMemo, useState, type ReactNode, type ElementType } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { Music2, PartyPopper, Lightbulb, BadgeCheck, CalendarCheck, Sparkles } from "lucide-react";
import Link from "next/link";

// Carga del portal de logo en diferido para no competir con el LCP
const PortalLazy = dynamic(() => import("./ui/HeroPortalLogo.client"), { ssr: false });

const GOLD = "#d7b86e";

/* Helpers de timeout compatibles con DOM/Node */
type TimeoutId = number;

function setTO(cb: () => void, ms = 0): TimeoutId {
  if (typeof window !== "undefined" && typeof window.setTimeout === "function") {
    return window.setTimeout(cb, ms) as unknown as TimeoutId;
  }
  // Node typings devuelven NodeJS.Timeout; lo forzamos a number para unificar
  return (setTimeout as unknown as (handler: TimerHandler, timeout?: number) => number)(cb, ms);
}

function clearTO(id?: TimeoutId) {
  if (id == null) return;
  if (typeof window !== "undefined" && typeof window.clearTimeout === "function") {
    window.clearTimeout(id as number);
  } else {
    (clearTimeout as unknown as (handle: number) => void)(id as number);
  }
}

/* Helpers idle sin tocar el tipo global Window */
type IdleCb = IdleRequestCallback;

function requestIdle(cb: IdleCb, timeout = 600): number {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    return (window as any).requestIdleCallback(cb, { timeout }) as number;
  }
  const start = Date.now();
  return setTO(() => {
    const deadline: IdleDeadline = {
      didTimeout: Date.now() - start >= timeout,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
    } as IdleDeadline;
    cb(deadline);
  }, 1);
}

function cancelIdle(id?: number) {
  if (!id) return;
  if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
    (window as any).cancelIdleCallback(id);
  } else {
    clearTO(id as unknown as TimeoutId);
  }
}

/* Utilidad CSS */
const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

function ChromeText({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "inline-block bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-100",
        className
      )}
      style={{
        WebkitTextStroke: "0.5px rgba(255,255,255,0.25)",
        textShadow: "0 0 24px rgba(255,255,255,0.15)"
      }}
    >
      {children}
    </span>
  );
}

function Badge({ icon: Icon, children }: { icon: ElementType; children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 backdrop-blur">
      <Icon className="h-4 w-4" aria-hidden />
      {children}
    </div>
  );
}

function CtaGold({ href, children }: { href: string; children: ReactNode }) {
  const label = typeof children === "string" ? `Ir a ${children}` : "Abrir sección";
  return (
    <Link
      href={href}
      aria-label={label}
      data-cta="primary"
      className={cx(
        "inline-flex items-center justify-center rounded-2xl px-5 py-2 font-semibold text-slate-900",
        "bg-gradient-to-br from-[#f1d99c] via-[#e9c87a] to-[#d7b86e]",
        "shadow-[0_8px_40px_rgba(215,184,110,0.25)] transition hover:scale-[1.02] active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      )}
    >
      {children}
    </Link>
  );
}

/* SEO JSON-LD (WebSite + Organization) */
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
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@type": "Organization",
            name: "Òrbita Events",
            url: base,
            logo: `${base}/img/brand/logo.png`,
            sameAs: [
              "https://www.instagram.com/orbitaevents",
              "https://www.facebook.com/orbitaevents"
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+34 699 121 023",
              contactType: "customer service",
              areaServed: "ES",
              availableLanguage: ["es", "ca"]
            }
          }
        ]
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
    <section className="relative isolate pt-28 text-center md:pt-36">
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
        <div className="mb-5 flex justify-center">
          <svg width="72" height="72" aria-hidden className="opacity-90">
            <circle cx="36" cy="36" r="34" stroke={GOLD} strokeWidth="2" fill="none" />
          </svg>
        </div>

        <h1 className="mb-3 text-[40px] font-black leading-[1.05] tracking-tight text-white md:text-[56px]">
          <ChromeText>Técnica, música y emoción con criterio.</ChromeText>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-white/80">
          Producción técnica, discomóvil y bodas. Sonido limpio, luz precisa y ritmo medido para que todo fluya.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Badge icon={BadgeCheck}>Presupuesto cerrado</Badge>
          <Badge icon={CalendarCheck}>Fechas limitadas</Badge>
          <Badge icon={Sparkles}>+150 eventos</Badge>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
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
    href: "/servicios/discomobil"
  },
  {
    icon: PartyPopper,
    title: "Bodas que se viven",
    desc: "Ceremonia clara, cóctel elegante y fiesta con energía real.",
    href: "/servicios/bodas"
  },
  {
    icon: Lightbulb,
    title: "Producción técnica",
    desc: "Montaje y operación con criterio. Sin técnica no hay magia.",
    href: "/servicios/produccion"
  }
] as const;

function Servicios() {
  const reduce = useReducedMotion();
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-12 text-center text-3xl font-black text-white md:text-5xl">
          <ChromeText>Servicios profesionales</ChromeText>
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {FEATURED.map((it, i) => (
            <motion.div
              key={it.title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.08]"
            >
              <it.icon className="mx-auto mb-4 h-10 w-10" style={{ color: GOLD }} aria-hidden />
              <h3 className="mb-2 text-xl font-bold text-white">{it.title}</h3>
              <p className="mb-5 text-sm text-white/75">{it.desc}</p>
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
    { name: "Jordi & Paula", text: "Trato cercano, sonido impecable y una pista encendida." }
  ] as const;
  const reduce = useReducedMotion();
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-3xl font-black text-white md:text-5xl">
          <ChromeText>Opiniones reales</ChromeText>
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.blockquote
              key={r.name}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white/80 backdrop-blur"
            >
              <p className="mb-3 text-sm italic">“{r.text}”</p>
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
        <h2 className="mb-3 text-3xl font-black text-white md:text-5xl">
          <ChromeText>Contacto y reservas</ChromeText>
        </h2>
        <p className="mb-6 text-white/70">
          Indícanos fecha, lugar y tipo de evento. Te respondemos con disponibilidad y presupuesto cerrado.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={waUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-slate-900 bg-gradient-to-br from-[#f1d99c] via-[#e9c87a] to-[#d7b86e] shadow-[0_8px_40px_rgba(215,184,110,0.25)] transition hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Abrir conversación de WhatsApp para solicitar disponibilidad"
          >
            WhatsApp
          </a>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Abrir formulario de contacto"
          >
            Formulario
          </Link>
        </div>
      </div>
    </section>
  );
}

/* EXPORT FINAL */
export default function AppLanding() {
  const reduce = useReducedMotion();
  const [showPortal, setShowPortal] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const timeoutId = setTO(() => setShowPortal(true), 150);
    const idleId = requestIdle(() => setShowPortal(true), 600);
    return () => {
      clearTO(timeoutId);
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
