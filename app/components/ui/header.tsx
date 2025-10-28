// app/components/ui/header.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/servicios/discomobil", label: "Discomóvil" },
  { href: "/servicios/bodas", label: "Bodas" },
  { href: "/servicios/empresas", label: "Eventos" },
  { href: "/servicios/produccion", label: "Producción" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/sobre-nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const PHONE = "+34699121023";
const WA_TEXT = "Hola, vengo desde la web y quiero información para mi evento";

export default function Header() {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Bloqueo de scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Foco en el primer link del menú para accesibilidad
    const t = setTimeout(() => firstLinkRef.current?.focus(), 0);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Cierre con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10
                 bg-[color:var(--bg-main)]/72 supports-[backdrop-filter]:bg-[color:var(--bg-main)]/60
                 supports-[backdrop-filter]:backdrop-blur-md transition-none"
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Altura ampliada para alojar logo 3x */}
        <div className="flex h-24 md:h-28 items-center justify-between gap-3">
          {/* Logo 3x */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0"
            aria-label="Ir al inicio de Òrbita Events"
            prefetch={false}
          >
            <Image
              src="/img/brand/favicon.svg"
              alt="Òrbita Events"
              width={112}
              height={112}
              className="h-24 w-24 md:h-28 md:w-28"
              priority
            />
            <span className="sr-only">Òrbita Events</span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Navegación principal">
            {NAV.map(it => (
              <NavLink key={it.href} href={it.href}>
                {it.label}
              </NavLink>
            ))}
          </nav>

          {/* CTAs ventas (desktop) */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href={`tel:${PHONE}`}
              className="oe-btn text-sm leading-none"
              aria-label="Llamar por teléfono"
              data-evt="cta_header_tel"
            >
              📞 699 121 023
            </a>
            <a
              href={`https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(WA_TEXT)}&utm_source=site&utm_medium=cta&utm_campaign=header`}
              target="_blank" rel="noopener noreferrer"
              className="oe-btn oe-btn-gold text-sm leading-none"
              aria-label="Abrir WhatsApp"
              data-evt="cta_header_wa"
            >
              WhatsApp
            </a>
          </div>

          {/* Toggle móvil con área táctil decente */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/15 px-4 h-10 text-sm"
            aria-expanded={open}
            aria-controls="mobile-sheet"
            aria-haspopup="true"
            onClick={() => setOpen(true)}
            data-evt="nav_mobile_toggle"
          >
            Menú
          </button>
        </div>
      </div>

      {/* SHEET móvil: backdrop + panel, sin Framer, sin parpadeos */}
      <div
        id="mobile-sheet"
        aria-hidden={!open}
        className={`md:hidden fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}
      >
        {/* Backdrop con transición solo de opacidad */}
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-200 motion-safe:duration-200 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />

        {/* Panel: entra desde arriba con translateY. Sin blur ni filtros raros. */}
        <div
          className={`absolute inset-x-0 top-0 rounded-b-3xl border-b border-white/10 bg-[color:var(--bg-main)]
                      transition-transform duration-250 motion-safe:duration-250
                      ${open ? "translate-y-0" : "-translate-y-full"}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="mx-auto max-w-7xl px-4 pt-4 pb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Menú</span>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-3 h-9 text-sm"
                onClick={() => setOpen(false)}
                data-evt="nav_mobile_close"
              >
                Cerrar
              </button>
            </div>

            <div className="mt-3 grid gap-2">
              {NAV.map((it, i) => (
                <NavLink
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  ref={i === 0 ? firstLinkRef : undefined}
                >
                  {it.label}
                </NavLink>
              ))}

              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${PHONE}`}
                  className="oe-btn text-sm leading-none w-full text-center"
                  data-evt="cta_header_tel_m"
                >
                  📞 Llamar
                </a>
                <a
                  href={`https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(WA_TEXT)}&utm_source=site&utm_medium=cta&utm_campaign=header_m`}
                  target="_blank" rel="noopener noreferrer"
                  className="oe-btn oe-btn-gold text-sm leading-none w-full text-center"
                  data-evt="cta_header_wa_m"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Safe area bottom en iOS */}
            <div className="oe-safe-bottom" />
          </div>
        </div>
      </div>
    </header>
  );
}
