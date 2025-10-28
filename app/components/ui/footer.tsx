"use client";
// app/components/ui/footer.tsx

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      className="border-t border-white/10 bg-black/40 backdrop-blur-md text-white/80"
      aria-label="Pie de página de Òrbita Events"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 md:grid-cols-3">
        {/* Columna 1 — Marca */}
        <div>
          <h2 className="text-white text-lg font-semibold">Òrbita Events</h2>
          <p className="mt-2 text-sm text-white/60">
            Sonido limpio, montaje impecable y pista encendida.
          </p>
        </div>

        {/* Columna 2 — Navegación */}
        <nav aria-label="Enlaces de pie" className="grid grid-cols-2 gap-3 text-sm">
          <Link href="/servicios/bodas" className="hover:text-white">Bodas</Link>
          <Link href="/servicios/discomobil" className="hover:text-white">Discomóvil</Link>
          <Link href="/servicios/empresas" className="hover:text-white">Eventos</Link>
          <Link href="/servicios/produccion" className="hover:text-white">Producción</Link>
          <Link href="/portfolio" className="hover:text-white">Portfolio</Link>
          <Link href="/faq" className="hover:text-white">FAQ</Link>
        </nav>

        {/* Columna 3 — Contacto */}
        <ul className="text-sm">
          <li>
            <a href="mailto:info@orbitaevents.cat" className="hover:text-white" aria-label="Enviar correo">
              info@orbitaevents.cat
            </a>
          </li>
          <li>
            <span>Barcelona · Catalunya</span>
          </li>
        </ul>

        <div className="md:col-span-3 mt-8 text-xs text-white/50">
          © {year ?? "…"} Òrbita Events — Todos los derechos reservados
        </div>
      </div>
    </footer>
  );
}
