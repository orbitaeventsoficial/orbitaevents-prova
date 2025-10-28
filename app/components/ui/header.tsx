// app/components/ui/header.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
// import Image from "next/image";  // ← eliminado, no usar para SVG
import NavLink from "./NavLink";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/servicios/discomobil", label: "Discomóvil" },
  { href: "/servicios/bodas", label: "Bodas" },
  { href: "/servicios/empresas", label: "Eventos" },
  { href: "/servicios/produccion", label: "Producción" },
  { href: "/portfolio", label: "Portfolio" },
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
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[1000] border-b border-white/10 bg-black/40 backdrop-blur-md text-white"
      aria-label="Cabecera de Òrbita Events"
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Marca */}
        <Link href="/" className="flex items-center gap-3" aria-label="Ir al inicio">
          {/* SVG: usar <img>, no next/image */}
          <img
            src="/img/brand/favicon.svg"
            alt="Òrbita"
            width="28"
            height="28"
            className="h-7 w-7"
          />
          <span className="text-base font-semibold tracking-wide">Òrbita Events</span>
        </Link>

        {/* Navegación desktop */}
        <nav aria-label="Navegación principal" className="hidden items-center gap-6 md:flex">
          {NAV.map((item, i) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
          <a
            className="rounded-md border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10"
            href={`https://wa.me/${PHONE.replace(/\D/g, "")}?text=${encodeURIComponent(WA_TEXT)}`}
            aria-label="Contactar por WhatsApp"
          >
            WhatsApp
          </a>
        </nav>

        {/* Botón menú móvil */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen(v => !v)}
          className="grid h-9 w-9 place-items-center rounded-md border border-white/20 md:hidden"
        >
          <span className="sr-only">Abrir menú</span>
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z" />
          </svg>
        </button>
      </div>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        hidden={!open}
        className="md:hidden border-t border-white/10 bg-black/60 backdrop-blur"
      >
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ul className="flex flex-col gap-2">
            {NAV.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  className="block rounded-md px-3 py-2 text-white/90 hover:bg-white/10 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                className="block rounded-md border border-white/20 px-3 py-2 text-center hover:bg-white/10"
                href={`https://wa.me/${PHONE.replace(/\D/g, "")}?text=${encodeURIComponent(WA_TEXT)}`}
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
