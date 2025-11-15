'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown, Calculator } from 'lucide-react';
import Image from 'next/image';

const servicios = [
  { name: 'DJ Bodas', href: '/servicios/bodas' },
  { name: 'Fiestas Privadas', href: '/servicios/fiestas' },
  { name: 'Discomóvil', href: '/servicios/discomovil' },
  { name: 'Eventos Empresas', href: '/servicios/empresas' },
  { name: 'Producción Técnica', href: '/servicios/produccion' },
  { name: 'Alquiler de Equipos', href: '/servicios/alquiler' },
];

const navItems = [
  { name: 'Inicio', href: '/' },
  { name: 'Packs', href: '/packs' },
  { name: 'Servicios', submenu: servicios },
  { name: 'Configurador', href: '/configurador', highlight: true },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Opiniones', href: '/opiniones' },
];

export default function Header({ className = '' }: { className?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl bg-bg-main/90 border-b border-white/10 ${className}`}>
      <div className="container mx-auto px-6 flex items-center justify-between h-32">
        {/* LOGO - SE AGRANDA AL HOVER */}
        <Link href="/" className="flex items-center ml-8 transition-transform duration-300 hover:scale-110">
          <Image
            src="/img/logoplanetatextdreta.svg"
            alt="Órbita Events"
            width={380}
            height={380}
            className="transition-transform duration-700"
            priority
          />
        </Link>

        {/* NAV DESKTOP */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) =>
            item.submenu ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(true)}
                onMouseLeave={() => setOpenDropdown(false)}
              >
                <button className="flex items-center gap-1 text-white/80 hover:text-oe-gold font-medium">
                  {item.name}
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown ? 'rotate-180' : ''}`} />
                </button>
                {/* DESPLEGABLE CON TRANSICIÓN SUAVE */}
                <div className={`absolute left-0 mt-2 w-56 bg-bg-surface border border-white/10 rounded-xl shadow-lg backdrop-blur-xl transition-opacity duration-200 ${openDropdown ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                  <ul className="py-2">
                    {item.submenu.map((sub) => (
                      <li key={sub.name}>
                        <Link href={sub.href} className="block px-4 py-2 text-white/80 hover:text-oe-gold hover:bg-white/5 transition">
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition ${item.highlight ? 'text-oe-gold flex items-center gap-2' : 'text-white/80 hover:text-oe-gold'}`}
              >
                {item.highlight && <Calculator className="w-4 h-4" />}
                {item.name}
              </Link>
            )
          )}
          <Link href="/contacto" className="oe-btn-gold px-6 py-2 font-semibold">
            Contacto
          </Link>
        </nav>

        {/* MOBILE TOGGLE */}
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <nav className="lg:hidden bg-bg-main/95 backdrop-blur-xl border-t border-white/10">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navItems.map((item) =>
              item.submenu ? (
                <details key={item.name} className="group">
                  <summary className="text-white/80 text-lg font-medium cursor-pointer flex justify-between items-center">
                    {item.name}
                    <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                  </summary>
                  <ul className="pl-4 mt-2 space-y-2">
                    {item.submenu.map((sub) => (
                      <li key={sub.name}>
                        <Link href={sub.href} className="block text-white/70 hover:text-oe-gold" onClick={() => setMobileOpen(false)}>
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-lg font-medium ${item.highlight ? 'text-oe-gold flex items-center gap-2' : 'text-white/80'}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.highlight && <Calculator className="w-5 h-5" />}
                  {item.name}
                </Link>
              )
            )}
            <Link href="/contacto" className="oe-btn-gold text-center py-3 mt-2" onClick={() => setMobileOpen(false)}>
              Contacto
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}