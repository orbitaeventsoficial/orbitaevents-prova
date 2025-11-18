'use client';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calculator, 
  Star,
  Instagram,
  Facebook,
  Linkedin,
  Youtube
} from 'lucide-react';

// ========================================
// CONSTANTS
// ========================================

const CONTACT_INFO = {
  phone: '+34699121023',
  email: 'info@orbitaevents.com',
  location: 'Barcelona, Catalunya',
  coverage: ['Barcelona', 'Lleida', 'Girona', 'Tarragona'],
};

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com/orbitaeventsoficial',
    color: 'hover:text-[#E4405F]',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    href: 'https://facebook.com/orbitaeventsoficial',
    color: 'hover:text-[#1877F2]',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/company/orbitaevents',
    color: 'hover:text-[#0A66C2]',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    href: 'https://youtube.com/@orbitaeventsoficial',
    color: 'hover:text-[#FF0000]',
  },
];

const SERVICIOS_LINKS = [
  { name: 'DJ Bodas', href: '/servicios/bodas' },
  { name: 'Fiestas Privadas', href: '/servicios/fiestas' },
  { name: 'Discomóvil', href: '/servicios/discomovil' },
  { name: 'Eventos Empresas', href: '/servicios/empresas' },
  { name: 'Producción Técnica', href: '/servicios/produccion' },
  { name: 'Alquiler Equipos', href: '/servicios/alquiler' },
];

const RECURSOS_LINKS = [
  { name: 'Packs y Precios', href: '/packs' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Opiniones', href: '/opiniones' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Blog', href: '/blog' },
  { name: 'Sobre Nosotros', href: '/about' },
];

const LEGAL_LINKS = [
  { name: 'Política de Privacidad', href: '/legal/privacidad' },
  { name: 'Términos y Condiciones', href: '/legal/terminos' },
  { name: 'Política de Cookies', href: '/legal/cookies' },
  { name: 'Aviso Legal', href: '/legal/aviso-legal' },
];

const TRUST_SIGNALS = [
  { metric: '4.9/5', label: 'Valoración', icon: '⭐' },
  { metric: '+150', label: 'Eventos', icon: '🎉' },
  { metric: '100%', label: 'Satisfacción', icon: '✨' },
  { metric: '24h', label: 'Respuesta', icon: '⚡' },
];

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
// SCHEMA MARKUP (LocalBusiness)
// ========================================

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Òrbita Events',
  description: 'DJ profesional, sonido, luces y efectos para bodas, fiestas y eventos corporativos en Catalunya',
  image: 'https://orbitaevents.com/img/logoplanetatextdreta.svg',
  logo: 'https://orbitaevents.com/img/logoplanetatextdreta.svg',
  url: 'https://orbitaevents.com',
  telephone: CONTACT_INFO.phone,
  email: CONTACT_INFO.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Barcelona',
    addressRegion: 'Catalunya',
    addressCountry: 'ES',
  },
  areaServed: CONTACT_INFO.coverage.map(city => ({
    '@type': 'City',
    name: city,
  })),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '90',
    bestRating: '5',
    worstRating: '1',
  },
  priceRange: '€€',
  openingHours: 'Mo-Su 09:00-23:00',
  sameAs: SOCIAL_LINKS.map(link => link.href),
};

// ========================================
// MAIN FOOTER COMPONENT
// ========================================

export default function Footer() {
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Hola, me gustaría información sobre Òrbita Events')}`;
  
  const handleLinkClick = (category: string, linkName: string) => {
    trackEvent('Footer_Link_Click', { category, link: linkName });
  };
  
  const handleSocialClick = (platform: string) => {
    trackEvent('Footer_Social_Click', { platform });
  };
  
  return (
    <>
      {/* Schema.org LocalBusiness markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      
      <footer
        className="bg-[#111214]/80 backdrop-blur-xl border-t border-white/10 relative overflow-hidden"
        role="contentinfo"
      >
        {/* Background gradient effect */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 30% 50%, rgba(215,184,110,0.1) 0%, transparent 50%)',
          }}
          aria-hidden="true"
        />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* ========================================
              TRUST SIGNALS BAR
              ======================================== */}
          
          <div className="py-8 border-b border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {TRUST_SIGNALS.map((signal, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 
                           transition-colors group"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform" aria-hidden="true">
                    {signal.icon}
                  </span>
                  <span className="text-2xl md:text-3xl font-bold text-[#d7b86e]">
                    {signal.metric}
                  </span>
                  <span className="text-sm text-white/60">{signal.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* ========================================
              MAIN FOOTER CONTENT
              ======================================== */}
          
          <div className="py-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* ========================================
                  COLUMN 1: BRAND & CONTACT
                  ======================================== */}
              
              <div className="lg:col-span-1">
                {/* Logo */}
                <Link
                  href="/"
                  className="inline-block mb-4 hover:scale-105 transition-transform"
                  onClick={() => handleLinkClick('brand', 'logo')}
                >
                  <Image
                    src="/img/logoplanetatextdreta.svg"
                    alt="Òrbita Events"
                    width={200}
                    height={60}
                    className="h-12 w-auto"
                  />
                </Link>
                
                <p className="text-white/70 mb-4 text-sm leading-relaxed">
                  DJ profesional, sonido, luces y efectos para eventos inolvidables en toda Catalunya.
                </p>
                
                {/* Coverage areas */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {CONTACT_INFO.coverage.map((city) => (
                    <span
                      key={city}
                      className="px-3 py-1 rounded-full bg-[#d7b86e]/10 border border-[#d7b86e]/30 
                               text-[#d7b86e] text-xs font-medium"
                    >
                      {city}
                    </span>
                  ))}
                </div>
                
                {/* Social Media */}
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleSocialClick(social.name)}
                        className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 ${social.color} 
                                  transition-all duration-200 hover:scale-110 active:scale-95
                                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7b86e]/50`}
                        aria-label={`Visitar ${social.name}`}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
              
              {/* ========================================
                  COLUMN 2: SERVICIOS
                  ======================================== */}
              
              <div>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="text-[#d7b86e]">•</span>
                  Servicios
                </h3>
                <ul className="space-y-2.5">
                  {SERVICIOS_LINKS.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={() => handleLinkClick('servicios', link.name)}
                        className="text-white/70 hover:text-[#d7b86e] text-sm transition-colors inline-flex items-center gap-2 group"
                      >
                        <span
                          className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#d7b86e] transition-colors"
                          aria-hidden="true"
                        />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* ========================================
                  COLUMN 3: RECURSOS
                  ======================================== */}
              
              <div>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="text-[#d7b86e]">•</span>
                  Recursos
                </h3>
                <ul className="space-y-2.5">
                  {RECURSOS_LINKS.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={() => handleLinkClick('recursos', link.name)}
                        className="text-white/70 hover:text-[#d7b86e] text-sm transition-colors inline-flex items-center gap-2 group"
                      >
                        <span
                          className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#d7b86e] transition-colors"
                          aria-hidden="true"
                        />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* ========================================
                  COLUMN 4: CONTACTO & CTA
                  ======================================== */}
              
              <div>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="text-[#d7b86e]">•</span>
                  Contacto
                </h3>
                
                <ul className="space-y-3 mb-6">
                  <li>
                    <a
                      href={`tel:${CONTACT_INFO.phone}`}
                      onClick={() => handleLinkClick('contact', 'phone')}
                      className="flex items-center gap-3 text-white/70 hover:text-[#d7b86e] text-sm transition-colors group"
                    >
                      <Phone className="w-4 h-4 text-[#d7b86e] group-hover:scale-110 transition-transform" />
                      <span>{CONTACT_INFO.phone}</span>
                    </a>
                  </li>
                  
                  <li>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      onClick={() => handleLinkClick('contact', 'email')}
                      className="flex items-center gap-3 text-white/70 hover:text-[#d7b86e] text-sm transition-colors group"
                    >
                      <Mail className="w-4 h-4 text-[#d7b86e] group-hover:scale-110 transition-transform" />
                      <span className="break-all">{CONTACT_INFO.email}</span>
                    </a>
                  </li>
                  
                  <li className="flex items-center gap-3 text-white/70 text-sm">
                    <MapPin className="w-4 h-4 text-[#d7b86e] flex-shrink-0" />
                    <span>{CONTACT_INFO.location}</span>
                  </li>
                </ul>
                
                {/* CTAs */}
                <div className="space-y-3">
                  <Link
                    href="/configurador"
                    onClick={() => handleLinkClick('cta', 'configurador')}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl 
                             bg-gradient-to-r from-[#d7b86e] to-[#e5c982] hover:from-[#e5c982] hover:to-[#f8e5a1]
                             text-black font-bold text-sm transition-all duration-200 
                             shadow-lg hover:shadow-xl hover:scale-105 active:scale-95
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7b86e]/50"
                  >
                    <Calculator className="w-4 h-4" aria-hidden="true" />
                    Calcular Precio
                  </Link>
                  
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick('cta', 'whatsapp')}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl 
                             bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm 
                             transition-all duration-200 shadow-lg hover:shadow-xl 
                             hover:scale-105 active:scale-95
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* ========================================
              BOTTOM BAR (Legal & Copyright)
              ======================================== */}
          
          <div className="py-6 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <p className="text-white/50 text-sm text-center md:text-left">
                © {new Date().getFullYear()} Òrbita Events. Todos los derechos reservados.
              </p>
              
              {/* Legal Links */}
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
                {LEGAL_LINKS.map((link, idx) => (
                  <span key={link.name} className="flex items-center gap-4">
                    <Link
                      href={link.href}
                      onClick={() => handleLinkClick('legal', link.name)}
                      className="text-white/50 hover:text-[#d7b86e] transition-colors"
                    >
                      {link.name}
                    </Link>
                    {idx < LEGAL_LINKS.length - 1 && (
                      <span className="text-white/30" aria-hidden="true">
                        •
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
