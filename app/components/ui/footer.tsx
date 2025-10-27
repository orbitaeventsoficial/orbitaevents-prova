"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-white/10 bg-black/40 backdrop-blur-md text-white/80"
      aria-label="Pie de página de Òrbita Events"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 md:grid-cols-3">
        {/* Columna 1 — Marca */}
        <div>
          <img
            src="/img/brand/orbitalockupwhite.png"
            alt="Òrbita Events"
            className="h-8 w-auto mb-3 select-none"
          />
          <p className="text-sm text-white/70 leading-relaxed">
            Sonido, iluminación y DJs para bodas, fiestas y eventos en Barcelona y Catalunya.
            Técnica impecable y emoción real.
          </p>
        </div>

        {/* Columna 2 — Navegación */}
        <nav aria-label="Enlaces del sitio">
          <h3 className="text-sm font-semibold uppercase text-white/60 mb-3 tracking-wider">
            Secciones
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/servicios/discomobil" className="hover:text-white">Discomóvil</Link></li>
            <li><Link href="/servicios/bodas" className="hover:text-white">Bodas</Link></li>
            <li><Link href="/servicios/empresas" className="hover:text-white">Eventos</Link></li>
            <li><Link href="/servicios/produccion" className="hover:text-white">Producción</Link></li>
            <li><Link href="/servicios/alquiler" className="hover:text-white">Alquiler</Link></li>
            <li><Link href="/sobre-nosotros" className="hover:text-white">Nosotros</Link></li>
            <li><Link href="/contacto" className="hover:text-white">Contacto</Link></li>
          </ul>
        </nav>

        {/* Columna 3 — Contacto */}
        <div>
          <h3 className="text-sm font-semibold uppercase text-white/60 mb-3 tracking-wider">
            Contacto
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="tel:+34699121023"
                className="hover:text-white"
                aria-label="Llamar por teléfono"
              >
                +34 699 121 023
              </a>
            </li>
            <li>
              <a
                href="mailto:info@orbitaevents.cat"
                className="hover:text-white"
                aria-label="Enviar correo"
              >
                info@orbitaevents.cat
              </a>
            </li>
            <li>
              <span>Barcelona · Catalunya</span>
            </li>
          </ul>

          <div className="mt-4 flex items-center gap-4">
            <a
              href="https://www.instagram.com/orbitaeventsoficial"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="Instagram de Òrbita Events"
              className="hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 2.5a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11zm0 2a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7zm5.75-.75a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5z" />
              </svg>
            </a>

            <a
              href="https://www.facebook.com/orbitaeventsoficial"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="Facebook de Òrbita Events"
              className="hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H8.09V12h2.41V9.72c0-2.38 1.42-3.7 3.6-3.7c1.04 0 2.13.18 2.13.18v2.35h-1.2c-1.18 0-1.54.73-1.54 1.48V12h2.63l-.42 2.88h-2.21v6.99A10.002 10.002 0 0 0 22 12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {year} Òrbita Events · Todos los derechos reservados
      </div>
    </footer>
  );
}
