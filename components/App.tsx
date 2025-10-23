/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Music2,
  Lightbulb,
  PartyPopper,
  CalendarCheck,
  BadgeCheck,
  Star,
  Mic2,
  Megaphone,
  Menu,
  X,
} from "lucide-react";
import OrbitaGlyph from "./ui/orbitaglyph";
import HeroPortalLogo from "./ui/HeroPortalLogo";

/* =============================
   ÒRBITA: LANDING · REACT + TAILWIND (single-file) · CORREGIDO
   ============================= */

/* ===== Paleta y tokens ===== */
const tokens = {
  bg: "from-[#0a0a0b] via-[#0b0c0d] to-[#0a0a0b]",
  chrome:
    "bg-[conic-gradient(at_30%_30%,#ffffff_0%,#d4d4d8_25%,#9ca3af_45%,#ffffff_60%,#a1a1aa_78%,#f3f4f6_100%)]",
  pearl:
    "bg-[radial-gradient(60%_80%_at_50%_50%,rgba(255,255,255,0.14),rgba(214,214,255,0.06),transparent_80%)]",
  energy: "from-amber-400 via-fuchsia-400 to-cyan-400",
  gold: "from-[#ffe08a] via-[#ffc93c] to-[#ff9f1a]",
  cyan: "from-cyan-300 via-sky-400 to-blue-500",
};

/* ===== Utils ===== */
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ===== GA4 helper (eventos) ===== */
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
function trackEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

/* ===== MetaSEO (alineado con index.html) ===== */
function MetaSEO() {
  useEffect(() => {
    const title = "DJ bodas Barcelona | Òrbita Events";
    const description =
      "DJ para bodas en Barcelona con música a tu gusto, iluminación cuidada y montaje sin complicaciones. Pide presupuesto cerrado.";
    const url = "https://orbitaevents.com";
    const ogImage = "/img/og-orbita.jpg";

    const upsert = (sel: string, create: () => HTMLElement) => {
      let el = document.querySelector(sel) as HTMLElement | null;
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      return el;
    };

    document.title = title;

    upsert('meta[name="description"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      return m;
    }).setAttribute("content", description);

    upsert('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    }).setAttribute("href", url);

    const og = (p: string, v: string) =>
      upsert(`meta[property="${p}"]`, () => {
        const m = document.createElement("meta");
        m.setAttribute("property", p);
        return m;
      }).setAttribute("content", v);

    og("og:title", title);
    og("og:description", description);
    og("og:type", "website");
    og("og:url", url);
    og("og:image", ogImage);

    const tw = (n: string, v: string) =>
      upsert(`meta[name="${n}"]`, () => {
        const m = document.createElement("meta");
        m.setAttribute("name", n);
        return m;
      }).setAttribute("content", v);

    tw("twitter:card", "summary_large_image");
    tw("twitter:title", title);
    tw("twitter:description", description);
    tw("twitter:image", ogImage);
  }, []);
  return null;
}

/* ===== PreloadHeroMedia (póster + vídeo) ===== */
function PreloadHeroMedia() {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];

    const img = document.createElement("link");
    img.rel = "preload";
    img.as = "image";
    img.href = "/img/hero-poster.jpg";
    img.fetchPriority = "high";
    links.push(img);

    const vid = document.createElement("link");
    vid.rel = "preload";
    (vid as any).as = "fetch";
    vid.href = "/video/hero.mp4";
    vid.crossOrigin = "anonymous";
    links.push(vid);

    links.forEach(l => document.head.appendChild(l));
    return () => links.forEach(l => document.head.removeChild(l));
  }, []);
  return null;
}

/* ===== JSON-LD LocalBusiness ===== */
function JsonLD() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Òrbita Events",
      image: ["/img/og-orbita.jpg"],
      url: "https://orbitaevents.com",
      telephone: "+34 699 121 023",
      areaServed: ["Barcelona", "Girona", "Tarragona", "Lleida"],
      sameAs: [
        "https://www.instagram.com/orbitaevents",
        "https://www.tiktok.com/@orbitaevents",
        "https://www.youtube.com/@orbitaevents",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Barcelona",
        addressRegion: "Cataluña",
        addressCountry: "ES",
      },
      makesOffer: [{ "@type": "Offer", name: "DJ bodas Barcelona" }],
      description:
        "DJ para bodas en Barcelona: música personalizada, iluminación y montaje profesional con presupuesto cerrado.",
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "200" },
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return null;
}

/* ===== ChromeText ===== */
function ChromeText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cx("inline-block bg-clip-text text-transparent", tokens.chrome, className)}
      style={{
        WebkitTextStroke: "0.5px rgba(255,255,255,0.35)",
        textShadow: "0 4px 24px rgba(255,255,255,0.2), 0 0 24px rgba(59,130,246,0.2)",
      }}
    >
      {children}
    </span>
  );
}

/* ===== BubbleCanvas (background animado) ===== */
function BubbleCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (!canvas) return;
      const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches || false;

    const baseCount = 120;
    const dpr = window.devicePixelRatio || 1;
    const MAX = prefersReduce ? 0 : Math.round(dpr > 1 ? baseCount * 0.75 : baseCount);

    function resize(): { w: number; h: number; DPI: number } | null {
      const DPI = dpr;
      if (!canvas) return null;
      const w = (canvas.width = Math.floor(window.innerWidth * DPI));
      const h = (canvas.height = Math.floor(Math.max(window.innerHeight, 900) * DPI));
      canvas.style.width = `${Math.floor(w / DPI)}px`;
      canvas.style.height = `${Math.floor(h / DPI)}px`;
      if (!ctx) return null;
      ctx.setTransform(DPI, 0, 0, DPI, 0, 0);
      return { w: Math.floor(w / DPI), h: Math.floor(h / DPI), DPI };
    }

    const __size = resize();
    if (!__size) return;
    let { w, h, DPI } = __size;const bubbles = Array.from({ length: MAX }).map(() => ({
      x: Math.random() * w,
      y: h + Math.random() * h,
      r: 1 + Math.random() * 3.5,
      vy: 0.5 + Math.random() * 1.4,
      vx: -0.2 + Math.random() * 0.4,
      hue: 42 + Math.random() * 18,
      alpha: 0.15 + Math.random() * 0.35,
    }));

    let raf = 0;

    const draw = () => {
      if (prefersReduce) return;
      raf = requestAnimationFrame(draw);
      const grd = ctx.createLinearGradient(0, 0, w, h);
      grd.addColorStop(0, "rgba(255,255,255,0.02)");
      grd.addColorStop(1, "rgba(0,0,0,0.03)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);
      for (const b of bubbles) {
        b.y -= b.vy;
        b.x += b.vx;
        if (b.y < -10) {
          b.y = h + 10;
          b.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${b.hue},90%,70%,${b.alpha})`;
        ctx.shadowBlur = 16;
        ctx.shadowColor = `hsla(${b.hue},90%,60%,0.35)`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      for (let i = 0; i < 6; i++) {
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, "rgba(255,215,130,0.02)");
        grad.addColorStop(1, "rgba(120,200,255,0.02)");
        ctx.fillStyle = grad;
        const angle = (Date.now() / 8000 + i) % (Math.PI * 2);
        ctx.save();
        ctx.translate(w / 2, h * 0.15);
        ctx.rotate(angle as unknown as number);
        ctx.fillRect(-2, 0, 4, h * 1.2);
        ctx.restore();
      }
    };

    if (!prefersReduce) draw();

    const onResize = () => {
      const r = resize(); if (!r) return;  if (!r) return; w = r.w; h = r.h;
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!prefersReduce) {
        raf = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 -z-10 opacity-[0.5] md:opacity-[0.55]"
      aria-hidden={true}
    />
  );
}

/* ===== Equalizer bar (decorativa) ===== */
function Equalizer() {
  const [bars, setBars] = useState(() => Array.from({ length: 24 }, () => 4));
  useEffect(() => {
    const id = setInterval(() => {
      setBars(prev => prev.map(() => 4 + Math.floor(Math.random() * 20)));
    }, 180);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex items-end gap-1 h-16 md:h-24" aria-hidden>
      {bars.map((h, i) => (
        <div
          key={i}
          className={cx("w-1 rounded-t-sm", "bg-gradient-to-t", tokens.cyan)}
          style={{ height: `${h * 4}px` }}
        />
      ))}
    </div>
  );
}

/* ===== WhatsApp Button ===== */
function WhatsAppButton({
  phone = "+34699121023",
  message = "Hola, me caso el [fecha] en [lugar]. ¿Tenéis disponible? Me interesa DJ para bodas en Barcelona.",
  floating = false,
  variant = "brand",
  gaLabel = "default",
}: {
  phone?: string;
  message?: string;
  floating?: boolean;
  variant?: "brand" | "pill";
  gaLabel?: string;
}) {
  const clean = phone.replace(/\D/g, "");
  const url = `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;

  const base =
    "group inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60";
  const pos = floating ? "fixed bottom-6 right-6 z-50" : "";

  const brand =
    "bg-[#22c55e] text-white hover:brightness-105 active:brightness-95 shadow-[0_3px_10px_rgba(34,197,94,0.22)]";
  const pill =
    "bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 text-white hover:scale-[1.02] active:scale-[0.98]";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir chat de WhatsApp con Òrbita Events"
      className={`${base} ${pos} ${variant === "brand" ? brand : pill}`}
      title="WhatsApp"
      onClick={() => trackEvent("click_whatsapp", { location: gaLabel })}
    >
      <svg className="h-5 w-5 opacity-95" viewBox="0 0 32 32" role="img" aria-hidden="true">
        <path
          fill="currentColor"
          d="M19.1 17.4c-.3-.1-1-.4-1.1-.5s-.3-.1-.4.1-.5.5-.6.6-.2.1-.3 0a6.7 6.7 0 0 1-2-1.2 7.5 7.5 0 0 1-1.4-1.7c-.1-.2 0-.3.1-.4l.3-.4c.1-.1.1-.2.2-.3s0-.2 0-.3 0-.3-.1-.4c-.1-.1-.4-1.1-.6-1.5s-.3-.3-.4-.3h-.3c-.1 0-.3 0-.4.2a2.6 2.6 0 0 0-.8 1.9 4.6 4.6 0 0 0 .9 2.5c1 1.6 2.3 2.9 4 3.7a9.1 9.1 0 0 0 1.6.6c.6.2 1.1.2 1.5.1a2.4 2.4 0 0 0 1.6-1.1c.1-.2.1-.6.1-.7s-.2-.2-.4-.3M27 16a11 11 0 1 1-16.4 9.6l-3.6 1 1-3.5A11 11 0 1 1 27 16m-11-9a9 9 0 0 0-7.7 13.6l.2.3-1.2 4.3 4.4-1.2.3.2A9 9 0 1 0 16 7"
        />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}

/* ===== Badge shimmer ===== */
function ShineBadge({ icon: Icon, children }: { icon: any; children: React.ReactNode }) {
  return (
    <div className="relative inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs md:text-sm text-white/80">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 via-transparent to-white/10 [mask-image:radial-gradient(40%_120%_at_50%_0%,black,transparent)]" />
      <Icon className="size-5 md:size-6 opacity-80" aria-hidden="true" />
      <span className="pr-1">{children}</span>
    </div>
  );
}

/* ===== Header (isotipo SVG + texto oficial) ===== */
function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const nav = document.querySelector("header nav");
    if (!nav) return;
    const onScroll = () => {
      nav.setAttribute("data-scrolled", window.scrollY > 10 ? "true" : "false");
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const closeAndGo = () => setOpen(false);

  return (
    <header id="top" className="fixed inset-x-0 top-0 z-40" role="banner">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 rounded bg-white/10 px-3 py-1 text-white"
      >
        Saltar al contenido
      </a>

      <div className="mx-auto max-w-7xl px-4">
        <nav
          aria-label="Navegación principal"
          className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur transition-shadow data-[scrolled=true]:shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
        >
          {/* Marca isotipo + texto oficial */}
          <a
            href="#inicio"
            className="flex items-center gap-2"
            aria-label="Inicio Òrbita Events"
            onClick={() => setOpen(false)}
          >
            <OrbitaGlyph size={36} className="h-9 w-9 md:h-10 md:w-10" />
            <span className="font-orbita font-extrabold text-white tracking-tight text-sm md:text-base">
              Òrbita <span className="text-oe-gold">Events</span>
            </span>
          </a>

          {/* Navegación desktop */}
          <ul className="hidden md:flex items-center gap-6 text-white/80 text-sm">
            <li><a href="#servicios" className="hover:text-white">Servicios</a></li>
            <li><a href="#packs" className="hover:text-white">Packs</a></li>
            <li><a href="#portfolio" className="hover:text-white">Portfolio</a></li>
            <li><a href="#opiniones" className="hover:text-white">Opiniones</a></li>
            <li><a href="#reserva" className="hover:text-white">Contacto</a></li>
          </ul>

          {/* CTA desktop */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="#reserva"
              onClick={() => trackEvent("click_reservar_fecha", { location: "header" })}
              className="rounded-xl border border-white/20 px-3 py-1.5 text-sm text-white/90 hover:bg-white/10"
            >
              Reservar fecha
            </a>
          </div>

          {/* Botón móvil */}
          <button
            className="md:hidden inline-flex items-center gap-2 rounded-xl border border-white/20 px-3 py-1.5 text-sm text-white/90 hover:bg-white/10"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            Menú
          </button>
        </nav>
      </div>

      {/* Panel móvil */}
      {open && (
        <div className="md:hidden fixed inset-0 z-30">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-x-0 top-[72px] mx-4 rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-4">
            <ul className="flex flex-col gap-2 text-white/90 text-base">
              {[
                ["Servicios", "#servicios"],
                ["Packs", "#packs"],
                ["Portfolio", "#portfolio"],
                ["Opiniones", "#opiniones"],
                ["Contacto", "#reserva"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="block rounded-xl px-3 py-2 hover:bg-white/10"
                    onClick={closeAndGo}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

/* ===== Hero (vídeo con fondo negro puro y fallback coherente) ===== */
function Hero() {
  return (
    <section
      id="inicio"
      role="region"
      className="relative isolate pt-28 md:pt-36"
      aria-labelledby="hero-heading"
    >
      {/* decoraciones suaves */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background:radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 mix-blend-screen opacity-35 bg-[conic-gradient(at_50%_10%,rgba(255,215,128,0.08),rgba(56,189,248,0.08),rgba(236,72,153,0.08),rgba(255,215,128,0.08))]"
      />

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Copy + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5 flex gap-2 flex-wrap">
              <ShineBadge icon={Sparkles}>+150 bodas y fiestas</ShineBadge>
              <ShineBadge icon={BadgeCheck}>Presupuesto cerrado</ShineBadge>
              <ShineBadge icon={CalendarCheck}>Fechas limitadas</ShineBadge>
            </div>

            <h1
              id="hero-heading"
              className="text-[40px] md:text-[56px] font-black leading-[1.05] tracking-[-0.01em] md:tracking-[-0.015em] text-white"
            >
              <ChromeText>DJ para bodas en Barcelona</ChromeText>
              <span className="block text-white text-[22px] md:text-[26px] font-semibold mt-2">
                Música a tu gusto, sonido claro y fiesta sin líos.
              </span>
            </h1>

            <p className="mt-4 text-white/80 md:text-lg max-w-xl">
              Ceremonia que se entiende, banquete cómodo para hablar y un baile que nadie quiere terminar. Tú eliges la música, nosotros lo hacemos fácil.
            </p>

            <div className="mt-7 flex items-center gap-4 flex-wrap">
              <a
                href="#reserva"
                onClick={() => trackEvent("click_reservar_fecha", { location: "hero" })}
                className={cx(
                  "group relative inline-flex items-center justify-center px-6 py-3 font-semibold rounded-2xl",
                  "text-slate-900 bg-gradient-to-br shadow-[0_8px_40px_rgba(255,200,0,0.25)]",
                  tokens.gold,
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-300 focus-visible:ring-offset-[#0a0a0b]",
                  "hover:scale-[1.02] active:scale-[0.98] transition"
                )}
                aria-label="Reservar fecha con Òrbita Events"
              >
                <span className="relative z-10">Reservar fecha</span>
                <span className="absolute inset-0 rounded-2xl bg-white/30 opacity-0 group-hover:opacity-100 transition" />
              </a>

              <a
                href="#packs"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/25 px-4 py-2.5 text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                aria-label="Ver packs y precios"
              >
                <Star className="size-5" aria-hidden="true" />
                <span className="font-semibold">Ver packs y precios</span>
              </a>

              <WhatsAppButton phone="+34699121023" floating={false} variant="brand" gaLabel="hero" />
            </div>

            <div className="mt-10 md:mt-12" aria-hidden="true">
              <Equalizer />
            </div>
          </motion.div>

          {/* Tarjeta visual con vídeo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-black p-1 shadow-xl"
              aria-hidden="true"
            >
              <div className="relative h-full w-full rounded-2xl overflow-hidden bg-black">
                <video
                  className="h-full w-full object-cover bg-black"
                  autoPlay
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  poster="/img/hero-poster.jpg"
                  src="/video/hero.mp4"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLVideoElement;
                    target.outerHTML = `
                      <img 
                        src="/img/logo-orbita.svg" 
                        alt="Òrbita Events" 
                        class="h-full w-full object-contain bg-black" 
                      />`;
                  }}
                />
              </div>

              <div className="absolute inset-2 rounded-2xl border border-white/10" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/80">
                <div className="flex items-center gap-2">
                  <Mic2 className="size-5" aria-hidden="true" />
                  <span className="text-sm">Sonido claro y cómodo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lightbulb className="size-5" aria-hidden="true" />
                  <span className="text-sm">Luz que anima a bailar</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ===== Servicios ===== */
function Servicios() {
  const items = [
    {
      icon: Star,
      title: "Bodas: DJ y discomóvil en Barcelona",
      k: "DJ bodas Barcelona",
      desc:
        "Ceremonia que se entiende, banquete cómodo para charlar y un fiestón que nadie quiere terminar. Tú eliges la música; nosotros hacemos que todo fluya.",
      bullets: [
        "Entrada y votos sin cortes ni acoples",
        "Música al volumen justo para todas las edades",
        "Pista llena desde el primer temazo",
      ],
      cta: { label: "Ver packs de boda", href: "#packs" },
    },
    {
      icon: PartyPopper,
      title: "Fiestas privadas y cumpleaños en Barcelona",
      k: "discomóvil fiestas Barcelona",
      desc:
        "Cumpleaños, aniversarios o comuniones. Montaje rápido, temazos a medida y efectos que levantan cualquier pista.",
      bullets: [
        "Lista musical adaptada a cada edad y estilo",
        "Montaje limpio y recogida sin líos",
        "Efectos visuales que suben la energía",
      ],
      cta: { label: "Quiero mi fiesta", href: "#reserva" },
    },
    {
      icon: Megaphone,
      title: "Eventos de empresa: sonido e iluminación",
      k: "sonido eventos empresa Barcelona",
      desc:
        "Presentaciones claras, timings cerrados y ambiente para networking. Imagen profesional sin sobresaltos.",
      bullets: [
        "Discursos que se oyen perfectos",
        "Luz corporativa que favorece tu marca",
        "After con música que une equipos",
      ],
      cta: { label: "Pedir propuesta", href: "#reserva" },
    },
    {
      icon: Music2,
      title: "Animación y DJ: bingo musical y karaoke",
      k: "DJ animación Barcelona",
      desc:
        "Dinámicas divertidas y sin vergüenza ajena: bingo musical, karaoke y juegos para romper el hielo.",
      bullets: [
        "Juegos guiados y rápidos",
        "Participación voluntaria y segura",
        "Diversión asegurada para todos",
      ],
      cta: { label: "Reservar animación", href: "#reserva" },
    },
    {
      icon: Lightbulb,
      title: "Alquiler de sonido e iluminación en Barcelona",
      k: "alquiler sonido luces Barcelona",
      desc:
        "Kits listos para usar con la potencia adecuada. Te explicamos cómo conectarlo en dos minutos.",
      bullets: [
        "Eliges el tamaño y te aconsejamos",
        "Entrega y recogida opcionales",
        "Soporte por WhatsApp el día del evento",
      ],
      cta: { label: "Ver disponibilidad", href: "#reserva" },
    },
  ] as const;

  return (
    <section id="servicios" className="relative py-20">
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
              className={cx(
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

              <p className="mt-2 text-white/75 text-sm leading-relaxed">{it.desc}</p>

              <ul className="mt-4 space-y-1.5 text-white/80 text-sm">
                {it.bullets.map((b, j) => (
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
    </section>
  );
}

/* ===== TrustStrip ===== */
function TrustStrip() {
  const stats = [
    { k: "+150", l: "bodas y fiestas celebradas" },
    { k: "4.9/5", l: "valoración media de clientes" },
    { k: "0 sorpresas", l: "presupuesto cerrado" },
    { k: "< 2 h", l: "montaje rápido y limpio" },
  ];
  return (
    <section className="relative py-10" aria-labelledby="truststrip-heading">
      <h2 id="truststrip-heading" className="sr-only">Motivos para confiar</h2>
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <li key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-white tabular-nums">
                  <ChromeText>{s.k}</ChromeText>
                </div>
                <div className="text-white/70 text-sm">{s.l}</div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-center">
            <a
              href="#opiniones"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-3 py-1.5 text-white/90 hover:bg-white/10"
              aria-label="Leer opiniones reales de clientes"
              onClick={() => trackEvent("click_leer_opiniones")}
            >
              <BadgeCheck className="size-5" />
              <span>Leer opiniones reales</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Packs ===== */
function Packs() {
  const MODES = ["Bodas", "Fiestas", "Empresa"] as const;
  const [mode] = useState<(typeof MODES)[number]>("Bodas"); // selector opcional (UI comentada)

  const packs = useMemo(() => {
    const base = {
      Bodas: [
        {
          name: "Esencial",
          price: "1.090€",
          line: "Ceremonia, cóctel y 3 horas de baile",
          points: [
            "Entrada y votos sin cortes ni nervios",
            "Lista musical pactada con vosotros",
            "Volumen cómodo para todas las edades",
          ],
        },
        {
          name: "Épico",
          price: "1.690€",
          line: "Ceremonia, cóctel y 4 horas de fiesta",
          points: [
            "Momentos clave coordinados con el lugar",
            "Cabina iluminada y ambiente de pista",
            "Efectos que suben el ánimo sin humo molesto",
          ],
          featured: true,
        },
        {
          name: "Leyenda",
          price: "2.390€",
          line: "Todo el día y after",
          points: [
            "Show de luces estilo festival",
            "Confeti o chispas frías con seguridad",
            "Soporte extendido hasta el último tema",
          ],
        },
      ],
      Fiestas: [
        {
          name: "Compacto",
          price: "690€",
          line: "Hasta 120 personas",
          points: [
            "Montaje rápido sin cables por medio",
            "Temazos a petición en directo",
            "Luces activas que animan sin deslumbrar",
          ],
        },
        {
          name: "Turbo",
          price: "990€",
          line: "Hasta 250 personas",
          points: [
            "Más potencia para bailar sin distorsión",
            "Efectos dinámicos que levantan la pista",
            "Humo fino y controlado cuando conviene",
          ],
          featured: true,
        },
        {
          name: "Ultra",
          price: "1.390€",
          line: "Más de 250 personas o exterior",
          points: [
            "Cobertura de espacio grande sin vacíos",
            "Efectos de escenario con impacto",
            "Plan B si cambia el tiempo",
          ],
        },
      ],
      Empresa: [
        {
          name: "Talk&Play",
          price: "990€",
          line: "Presentación y cóctel",
          points: [
            "Micros que no acoplan nunca",
            "Música discreta para conversar",
            "Iluminación que favorece fotos y vídeo",
          ],
        },
        {
          name: "Brand Jam",
          price: "1.590€",
          line: "Presentación y fiesta",
          points: [
            "Guion con tiempos cerrados",
            "Luz corporativa que refuerza marca",
            "DJ que lee la sala y conecta equipos",
          ],
          featured: true,
        },
        {
          name: "Expo Max",
          price: "2.190€",
          line: "Feria o lanzamiento",
          points: [
            "Escenario y pruebas antes de abrir",
            "Varios micros sin solaparse",
            "Técnico disponible durante todo el acto",
          ],
        },
      ],
    } as const;
    return base[mode];
  }, [mode]);

  return (
    <section id="packs" className="relative py-20">
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
            <button key={m} onClick={() => setMode(m)} className={cx("rounded-xl px-3 py-1 text-sm border", mode===m ? "border-amber-300 text-white" : "border-white/20 text-white/70")}>{m}</button>
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
              className={cx(
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
    </section>
  );
}

/* ===== Portfolio ===== */
function Portfolio() {
  const shots = [
    "/img/portfolio/shot-01.jpg",
    "/img/portfolio/shot-02.jpg",
    "/img/portfolio/shot-03.jpg",
    "/img/portfolio/shot-04.jpg",
    "/img/portfolio/shot-05.jpg",
    "/img/portfolio/shot-06.jpg",
  ];
  return (
    <section id="portfolio" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl md:text-5xl font-black text-white">
            <ChromeText>Portfolio de bodas y eventos en Barcelona</ChromeText>
          </h2>
          <p className="text-white/60 text-sm max-w-sm">
            Montajes reales en Barcelona y alrededores: buena música, buena luz y pistas llenas.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shots.map((src, i) => (
            <figure
              key={src}
              className="relative aspect-video rounded-2xl border border-white/10 overflow-hidden"
            >
              <img
                src={src}
                alt={`Montaje Òrbita Events ${i + 1}`}
                className="relative z-10 h-full w-full object-cover block"
                loading="lazy"
                decoding="async"
                width={800}
                height={450}
              />
              <figcaption className="sr-only">Montaje real de Òrbita Events</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Opiniones ===== */
function Opiniones() {
  const reviews = [
    {
      name: "Laura & Marc",
      text: "La ceremonia se oyó perfecta y en la fiesta no paró nadie. Todo fácil y sin estrés.",
      rating: 5,
      photo: "/img/avatars/ava-01.jpg",
    },
    {
      name: "Nuria",
      text: "Entendieron nuestro estilo y lo clavaron. El primer baile quedó precioso con la luz.",
      rating: 5,
      photo: "/img/avatars/ava-02.jpg",
    },
    {
      name: "Jordi & Paula",
      text: "Presupuesto claro, trato cercano y un fiestón que hasta el local grabó para redes.",
      rating: 5,
      photo: "/img/avatars/ava-03.jpg",
    },
  ];

  return (
    <section id="opiniones" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-3xl md:text-5xl font-black text-white">
          <ChromeText>Opiniones reales de bodas en Barcelona</ChromeText>
        </h2>
        <ul className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <li key={i} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <img src={r.photo} alt={`Foto de ${r.name}`} className="size-10 rounded-full" loading="lazy" />
                <div>
                  <p className="text-white font-semibold text-sm">{r.name}</p>
                  <p className="text-amber-300" aria-label={`${r.rating} de 5`}>
                    {"★★★★★".slice(0, r.rating)}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-white/80 text-sm">“{r.text}”</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ===== FAQ ===== */
function FAQ() {
  const faqs = [
    {
      q: "¿Trabajáis fuera de Barcelona?",
      a: "Sí. Vamos donde haga falta en Cataluña: Girona, Tarragona, Lleida o donde nos pidáis. Dejamos los costes cerrados antes de firmar para que no haya sorpresas.",
    },
    {
      q: "¿El volumen será cómodo para todos?",
      a: "Siempre. Ajustamos al lugar y a los invitados: voces claras en la ceremonia, música ambiente en el banquete y potencia justa en el baile para que disfruten todas las edades.",
    },
    {
      q: "¿Podemos elegir la música?",
      a: "Por supuesto. Preparamos una lista con vosotros, aceptamos peticiones en vivo y nos adaptamos a vuestros estilos favoritos para que la fiesta sea 100% personal.",
    },
    {
      q: "¿El presupuesto es cerrado?",
      a: "Sí. El precio que acordamos es final. Incluye montaje, pruebas de sonido y desmontaje. No habrá costes ocultos.",
    },
    {
      q: "¿Qué pasa si falla algo técnico?",
      a: "Nada. Llevamos equipo de respaldo y un técnico pendiente durante todo el evento. Sonido y luces sin interrupciones.",
    },
  ];
  return (
    <section id="faq" className="relative py-20">
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
    </section>
  );
}

/* ===== Reserva ===== */
function Reserva() {
  const phone = "+34699121023";
  const waMsg =
    "Hola Òrbita, quiero reservar. Fecha: [dd/mm/aaaa]. Lugar: [masía/sala/ciudad]. Invitados: [número]. Tipo: [boda/fiesta/empresa]. ¿Disponibilidad?";
  const waUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(waMsg)}`;

  const email = "info@orbitaevents.com";
  const subject = "Reserva Òrbita · [fecha] · [lugar]";
  const body =
    "Hola Òrbita,%0D%0A%0D%0AQuiero reservar:%0D%0A• Fecha: [dd/mm/aaaa]%0D%0A• Lugar: [masía/sala/ciudad]%0D%0A• Invitados: [número]%0D%0A• Tipo de evento: [boda/fiesta/empresa]%0D%0A• Notas: [opcional]%0D%0A%0D%0A¿Disponibilidad y presupuesto cerrado?";

  return (
    <section id="reserva" className="relative py-20" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 id="contact-heading" className="text-3xl md:text-5xl font-black text-white">
          <ChromeText>Contacto y reserva de fecha</ChromeText>
        </h2>
        <p className="mt-3 text-white/70">
          Dinos fecha, lugar y número de invitados. Te respondemos con disponibilidad y presupuesto cerrado.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row items-stretch justify-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("click_whatsapp", { location: "reserva" })}
            className={cx(
              "inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold",
              "bg-gradient-to-br",
              tokens.gold,
              "text-slate-900 shadow-[0_8px_40px_rgba(255,200,0,0.25)] hover:scale-[1.02] active:scale-[0.98] transition"
            )}
            aria-label="Abrir WhatsApp para reservar fecha"
            title="Reservar por WhatsApp"
          >
            Reservar por WhatsApp
          </a>

        <a
            href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`}
            onClick={() => trackEvent("click_email", { location: "reserva" })}
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10"
            aria-label="Enviar email para reservar fecha"
            title="Reservar por email"
          >
            Reservar por email
          </a>
        </div>

        <div className="mt-5 flex flex-col items-center gap-1 text-white/80 text-sm">
          <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-white">{phone}</a>
        </div>

        <ul className="mt-6 grid sm:grid-cols-3 gap-3 text-left">
          {[
            ["Presupuesto cerrado", "Sin costes ocultos ni letra pequeña."],
            ["Respuesta rápida", "Te confirmamos disponibilidad cuanto antes."],
            ["Montaje limpio", "Menos de 2 horas y sin molestar al evento."],
          ].map(([t, d], i) => (
            <li key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80">
              <p className="font-semibold text-white">{t}</p>
              <p className="text-sm mt-1">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ===== Footer ===== */
function Footer() {
  return (
    <footer className="relative py-10" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Información de contacto</h2>
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur flex items-center justify-between flex-wrap gap-3">
          <span className="text-white/70 text-sm">
            © {new Date().getFullYear()} Òrbita Events · Discomóvil bodas y eventos en Barcelona y alrededores
          </span>
          <div className="flex items-center gap-4 text-sm">
            <a href="tel:+34699121023" className="text-white/80 hover:text-white">+34 699 121 023</a>
            <a href="mailto:info@orbitaevents.com" className="text-white/80 hover:text-white">info@orbitaevents.com</a>
            <a href="#top" className="text-white/70 hover:text-white">Volver arriba</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===== App (export) ===== */
export default function App() {
  return (
    <div className={cx("min-h-screen bg-gradient-to-br", tokens.bg)}>
      {/* Splash centrado X/Y */}
      <HeroPortalLogo
        svgUrl="/img/brand/orbita-glyph.anim.svg"
        autoHide
        durationMs={3200}
        fadeMs={800}
        respectOnce={false}   // en dev, que salga SIEMPRE
        zIndexClass="z-[9999]"
        sizePx={280}          // un pelín más pequeño
        liftVh={-8}
        float
        showWordmark
        debug={false}
      />

      <MetaSEO />
      <PreloadHeroMedia />
      <JsonLD />
      <BubbleCanvas />
      <Header />

      <main id="main" role="main">
        <Hero />
        <Servicios />
        <TrustStrip />
        <Packs />
        <Portfolio />
        <Opiniones />
        <FAQ />
        <Reserva />
      </main>

      <Footer />
      {/* <WhatsAppButton phone="+34699121023" floating variant="brand" gaLabel="floating" /> */}
    </div>
  );
}
