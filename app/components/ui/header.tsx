// app/components/ui/header.tsx
import Link from "next/link";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/servicios/discomobil", label: "Discomóvil" },
  { href: "/servicios/bodas", label: "Bodas" },
  { href: "/servicios/empresas", label: "Eventos" },
  { href: "/servicios/produccion", label: "Producción" },
  { href: "/sobre-nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 inline-flex items-center">
            <img
              src="/img/brand/orbitalockupwhite.png"
              alt="Òrbita Events"
              className="h-10 w-auto select-none"
            />
            <span className="sr-only">Inicio</span>
          </Link>

          {/* Navegación Desktop */}
          <nav aria-label="Principal" className="hidden md:flex items-center gap-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/85 hover:text-white transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Navegación Mobile */}
          <details className="md:hidden relative">
            <summary
              className="list-none inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 hover:text-white hover:border-white/30 cursor-pointer"
              aria-label="Abrir menú"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </summary>

            <nav
              aria-label="Principal móvil"
              className="absolute right-0 mt-2 min-w-48 rounded-2xl border border-white/10 bg-black/80 p-2 backdrop-blur-md"
            >
              <ul className="grid">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-xl px-4 py-2 text-sm text-white/90 hover:bg-white/10"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
