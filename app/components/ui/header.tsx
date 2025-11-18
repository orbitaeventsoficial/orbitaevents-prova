'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Menu, X, ChevronDown, Calculator, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ========================================
// TYPES & CONSTANTS
// ========================================

interface ServiceItem {
  name: string;
  href: string;
  icon?: string;
}

interface NavItem {
  name: string;
  href?: string;
  submenu?: ServiceItem[];
  highlight?: boolean;
  external?: boolean;
}

const SERVICIOS: ServiceItem[] = [
  { name: 'DJ Bodas', href: '/servicios/bodas', icon: '💍' },
  { name: 'Fiestas Privadas', href: '/servicios/fiestas', icon: '🎉' },
  { name: 'Discomóvil', href: '/servicios/discomovil', icon: '🎵' },
  { name: 'Eventos Empresas', href: '/servicios/empresas', icon: '💼' },
  { name: 'Producción Técnica', href: '/servicios/produccion', icon: '🎬' },
  { name: 'Alquiler de Equipos', href: '/servicios/alquiler', icon: '🔊' },
];

const NAV_ITEMS: NavItem[] = [
  { name: 'Inicio', href: '/' },
  { name: 'Packs', href: '/packs' },
  { name: 'Servicios', submenu: SERVICIOS },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Configurador', href: '/configurador', highlight: true },
];

const WHATSAPP_NUMBER = '+34699121023';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent('Hola, me gustaría información sobre Òrbita Events')}`;

// ========================================
// ANALYTICS
// ========================================

let trackEvent: (event: string, data?: any) => void = () => {};

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  import('@vercel/analytics')
    .then((mod) => {
      trackEvent = mod.track;
    })
    .catch(() => {});
}

// ========================================
// DROPDOWN COMPONENT (Memoized)
// ========================================

interface DropdownMenuProps {
  items: ServiceItem[];
  isOpen: boolean;
  onClose: () => void;
}

const DropdownMenu = memo(function DropdownMenu({ items, isOpen, onClose }: DropdownMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute left-0 mt-2 w-64 bg-[#111214] border-2 border-[#d7b86e]/30 rounded-xl 
                     shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl overflow-hidden z-50"
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.22, 0.9, 0.32, 1] }}
        >
          <ul className="py-2" role="menu">
            {items.map((item) => (
              <li key={item.name} role="none">
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-[#d7b86e] 
                           hover:bg-white/5 transition-all duration-200 group"
                  onClick={() => {
                    onClose();
                    trackEvent('Header_Dropdown_Click', { service: item.name });
                  }}
                  role="menuitem"
                >
                  {item.icon && (
                    <span className="text-xl group-hover:scale-110 transition-transform" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

// ========================================
// MAIN HEADER COMPONENT
// ========================================

export default function Header({ className = '' }: { className?: string }) {
  // ========================================
  // STATE
  // ========================================
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  
  // ========================================
  // SCROLL DETECTION (for header shadow)
  // ========================================
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // ========================================
  // HANDLERS
  // ========================================
  
  const handleDropdownEnter = useCallback(() => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    dropdownTimerRef.current = setTimeout(() => {
      setDropdownOpen(true);
    }, 100); // 100ms hover delay (UX best practice)
  }, []);
  
  const handleDropdownLeave = useCallback(() => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    dropdownTimerRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  }, []);
  
  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => {
      const newState = !prev;
      trackEvent('Header_Mobile_Menu', { action: newState ? 'open' : 'close' });
      return newState;
    });
  }, []);
  
  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);
  
  const handleLogoClick = useCallback(() => {
    trackEvent('Header_Logo_Click');
  }, []);
  
  const handleWhatsAppClick = useCallback(() => {
    trackEvent('Header_WhatsApp_Click');
  }, []);
  
  // ========================================
  // CLEANUP
  // ========================================
  
  useEffect(() => {
    return () => {
      if (dropdownTimerRef.current) {
        clearTimeout(dropdownTimerRef.current);
      }
    };
  }, []);
  
  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);
  
  // ========================================
  // RENDER
  // ========================================
  
  return (
    <header
      className={`
        sticky top-0 z-50 
        backdrop-blur-xl bg-[#0a0a0b]/90 
        border-b transition-all duration-300
        ${scrolled ? 'border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.6)]' : 'border-white/10'}
        ${className}
      `}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* ========================================
              LOGO
              ======================================== */}
          
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#d7b86e]/50 rounded-lg"
            aria-label="Òrbita Events - Ir a inicio"
          >
            <Image
              src="/img/logoplanetatextdreta.svg"
              alt="Òrbita Events"
              width={280}
              height={80}
              className="h-12 lg:h-16 w-auto"
              priority
            />
          </Link>
          
          {/* ========================================
              DESKTOP NAVIGATION
              ======================================== */}
          
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" role="navigation" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) =>
              item.submenu ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-white/80 hover:text-[#d7b86e] 
                             hover:bg-white/5 font-medium transition-all duration-200
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7b86e]/50"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    {item.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        dropdownOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  
                  <DropdownMenu
                    items={item.submenu}
                    isOpen={dropdownOpen}
                    onClose={() => setDropdownOpen(false)}
                  />
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href!}
                  onClick={() => trackEvent('Header_Nav_Click', { item: item.name })}
                  className={`
                    px-3 py-2 rounded-lg font-medium transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7b86e]/50
                    ${
                      item.highlight
                        ? 'text-[#d7b86e] hover:text-[#f8e5a1] hover:bg-[#d7b86e]/10 flex items-center gap-2'
                        : 'text-white/80 hover:text-[#d7b86e] hover:bg-white/5'
                    }
                  `}
                >
                  {item.highlight && <Calculator className="w-4 h-4" aria-hidden="true" />}
                  {item.name}
                </Link>
              )
            )}
            
            {/* WhatsApp CTA Desktop */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="ml-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] 
                       text-white font-bold transition-all duration-200 shadow-md hover:shadow-lg
                       hover:scale-105 active:scale-95
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50"
              aria-label="Contactar por WhatsApp"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>
          </nav>
          
          {/* ========================================
              MOBILE MENU TOGGLE
              ======================================== */}
          
          <button
            onClick={toggleMobile}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7b86e]/50"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      
      {/* ========================================
          MOBILE MENU
          ======================================== */}
      
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-menu"
            className="lg:hidden bg-[#0a0a0b]/98 backdrop-blur-xl border-t border-white/10"
            role="navigation"
            aria-label="Navegación móvil"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.9, 0.32, 1] }}
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
              {NAV_ITEMS.map((item) =>
                item.submenu ? (
                  <details key={item.name} className="group">
                    <summary className="flex items-center justify-between px-4 py-3 rounded-lg text-white/80 
                                      text-lg font-medium cursor-pointer hover:bg-white/5 transition-colors
                                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7b86e]/50">
                      {item.name}
                      <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" aria-hidden="true" />
                    </summary>
                    <ul className="mt-2 space-y-1">
                      {item.submenu.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.href}
                            onClick={closeMobile}
                            className="flex items-center gap-3 px-6 py-2 rounded-lg text-white/70 
                                     hover:text-[#d7b86e] hover:bg-white/5 transition-colors"
                          >
                            {sub.icon && <span className="text-lg" aria-hidden="true">{sub.icon}</span>}
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href!}
                    onClick={closeMobile}
                    className={`
                      flex items-center gap-2 px-4 py-3 rounded-lg text-lg font-medium transition-colors
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7b86e]/50
                      ${
                        item.highlight
                          ? 'text-[#d7b86e] bg-[#d7b86e]/10 hover:bg-[#d7b86e]/20'
                          : 'text-white/80 hover:bg-white/5'
                      }
                    `}
                  >
                    {item.highlight && <Calculator className="w-5 h-5" aria-hidden="true" />}
                    {item.name}
                  </Link>
                )
              )}
              
              {/* WhatsApp CTA Mobile */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  closeMobile();
                  handleWhatsAppClick();
                }}
                className="flex items-center justify-center gap-2 mt-4 px-6 py-4 rounded-xl 
                         bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-lg
                         transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                Contactar por WhatsApp
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
