'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const servicios = [
  { name: 'Bodas', href: '/servicios/bodas' },
  { name: 'Fiestas Privadas', href: '/servicios/fiestas' },
  { name: 'Empresas', href: '/servicios/empresas' },
  { name: 'Producción Técnica', href: '/servicios/produccion' },
  { name: 'Alquiler de Equipos', href: '/servicios/alquiler' },
  { name: 'Fiestas Temáticas', href: '/servicios/tematicas' },
];

const navItems = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', submenu: servicios },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'FAQs', href: '/faqs' },
  { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
];

export default function Header({ className = '' }: { className?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl bg-bg-main/90 border-b border-white/10 ${className}`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-20">
        {/* LOGO */}
        <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-black font-display gradient-text"
          >
            <span className="text-3xl">🪐</span> Òrbita
          </Link>
        </motion.div>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 relative">
          {navItems.map((item) =>
            item.submenu ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(true)}
                onMouseLeave={() => setOpenDropdown(false)}
              >
                <button
                  className="flex items-center gap-1 text-white/80 hover:text-oe-gold font-medium transition"
                >
                  {item.name}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openDropdown ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-2 w-56 bg-bg-surface border border-white/10 rounded-xl shadow-lg backdrop-blur-xl z-50"
                    >
                      <ul className="flex flex-col py-2">
                        {item.submenu.map((sub) => (
                          <li key={sub.name}>
                            <Link
                              href={sub.href}
                              className="block px-4 py-2 text-white/80 hover:text-oe-gold hover:bg-white/5 transition"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div key={item.name} whileHover={{ y: -2 }}>
                <Link
                  href={item.href}
                  className="text-white/80 hover:text-oe-gold font-medium transition"
                >
                  {item.name}
                </Link>
              </motion.div>
            )
          )}

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/contacto" className="oe-btn-gold px-6 py-2 font-semibold">
              Contacto
            </Link>
          </motion.div>
        </nav>

        {/* BOTÓN MOBILE */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MENÚ MOBILE */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-bg-main/95 backdrop-blur-xl border-t border-white/10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navItems.map((item) =>
                item.submenu ? (
                  <details key={item.name} className="group">
                    <summary className="text-white/80 text-lg font-medium cursor-pointer flex items-center justify-between">
                      {item.name}
                      <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                    </summary>
                    <ul className="pl-4 mt-2 flex flex-col gap-2">
                      {item.submenu.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.href}
                            className="block text-white/70 hover:text-oe-gold transition"
                            onClick={() => setMobileOpen(false)}
                          >
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
                    className="text-white/80 text-lg font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}
              <Link
                href="/contacto"
                className="oe-btn-gold text-center py-3 mt-2"
                onClick={() => setMobileOpen(false)}
              >
                Contacto
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
