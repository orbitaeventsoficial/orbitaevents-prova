// data/packs-config.ts
// 🔥 FUENTE ÚNICA DE VERDAD - TODOS LOS PACKS DE ÒRBITA EVENTS
// Si cambias un precio aquí, cambia en toda la web. Sin perseguir gremlins.

export type ServiceSlug = 'fiestas' | 'bodas' | 'discomobil' | 'alquiler' | 'empresas';

export const ALL_SERVICES: ServiceSlug[] = [
  'fiestas',
  'bodas',
  'discomobil',
  'alquiler',
  'empresas',
];

export type PackId =
  // Fiestas
  | 'fiestas-cumple-basico'
  | 'fiestas-despedida-plus'
  | 'fiestas-tematica-completa'
  // Bodas
  | 'bodas-esencial'
  | 'bodas-premium'
  | 'bodas-vip'
  // Discomóvil
  | 'discomovil-basica'
  | 'discomovil-premium'
  | 'discomovil-vip'
  // Alquiler
  | 'alquiler-sonido-pro'
  | 'alquiler-luces-led'
  | 'alquiler-pioneer-ddj'
  | 'alquiler-tecnico'
  // Empresas
  | 'empresas-corporativo-basico'
  | 'empresas-corporativo-premium'
  | 'empresas-corporativo-vip';

// ==========================================
// 🎁 EXTRAS CENTRALIZADOS
// ==========================================
export interface ExtraDefinition {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  popular?: boolean;
  premium?: boolean;
  category?: 'effects' | 'visual' | 'time' | 'other';
}

export const EXTRAS: ExtraDefinition[] = [
  {
    id: 'confeti',
    name: 'Confeti + Chispas Frías',
    description: 'Momento WOW con confeti biodegradable + chispas frías seguras',
    price: 150,
    icon: '🎊',
    popular: true,
    category: 'effects',
  },
  {
    id: 'co2',
    name: 'Cañones CO2',
    description: 'Efectos de CO2 para momentos épicos (entrada novios, cierre fiesta)',
    price: 200,
    icon: '❄️',
    premium: true,
    category: 'effects',
  },
  {
    id: 'humo-bajo',
    name: 'Máquina Humo Bajo (Nube)',
    description: 'Efecto alfombra de nubes para primer baile romántico',
    price: 180,
    icon: '☁️',
    popular: true,
    category: 'effects',
  },
  {
    id: 'pantalla',
    name: 'Pantalla LED para Visuales',
    description: 'Pantalla LED 2x3m con proyección de fotos/vídeos personalizados',
    price: 300,
    icon: '📺',
    category: 'visual',
  },
  {
    id: 'photobooth',
    name: 'Photobooth con Props',
    description: 'Rincón de fotos con atrezzo + impresión instantánea',
    price: 250,
    icon: '📸',
    category: 'visual',
  },
  {
    id: 'dj-extra',
    name: 'Hora Extra de DJ',
    description: 'Porque cuando la fiesta arrasa, nadie quiere que termine',
    price: 120,
    icon: '⏰',
    category: 'time',
  },
];

// ==========================================
// 💰 SISTEMA DE OFERTAS/DESCUENTOS
// ==========================================
export interface OfferDefinition {
  id: string;
  name: string;
  discount: number; // porcentaje
  minAmount?: number; // mínimo para aplicar
  minExtras?: number; // mínimo número de extras
  months?: number[]; // meses válidos
  validUntil?: string; // fecha límite
  description: string;
  badge: string;
  priority?: number; // mayor = más prioridad al aplicar
}

export const OFFERS = {
  earlyBird: {
    id: 'early-bird',
    name: 'Reserva Hoy - 10% OFF',
    discount: 10,
    minAmount: 800, // mínimo 800€ para aplicar
    validUntil: '2025-12-31',
    description: 'Reserva hoy y ahorra 10% en tu pack base',
    badge: '🔥 OFERTA LIMITADA',
    priority: 3,
  } as OfferDefinition,
  combo: {
    id: 'combo-extras',
    name: 'Pack de 3 Extras',
    discount: 15, // 15% en extras si coges 3 o más
    minExtras: 3,
    description: 'Contrata 3+ extras y ahorra 15%',
    badge: '💎 COMBO',
    priority: 2,
  } as OfferDefinition,
  seasonal: {
    id: 'temporada-baja',
    name: 'Descuento Temporada Baja',
    discount: 12,
    months: [1, 2, 11, 12], // Enero, Febrero, Noviembre, Diciembre
    description: 'Eventos en temporada baja tienen 12% descuento',
    badge: '📅 TEMPORADA',
    priority: 1,
  } as OfferDefinition,
};

// ==========================================
// 📦 DEFINICIÓN DE PACKS
// ==========================================
export interface PackDefinition {
  id: PackId;
  service: ServiceSlug;
  slug: string;
  name: string;
  tagline: string;
  emotion?: string;
  price: string; // '400€' para mostrar
  priceValue: number; // 400 para cálculos
  priceOriginal?: string | null;
  features: string[];
  ideal?: string;
  bestFor?: string;
  duration?: string;
  highlight?: boolean;
  popular?: boolean;
  badge?: string | null;
  cta?: string;
}

const PACKS: PackDefinition[] = [
  // ==========================================
  // FIESTAS PRIVADAS
  // ==========================================
  {
    id: 'fiestas-cumple-basico',
    service: 'fiestas',
    slug: 'cumple-basico',
    name: '🎂 Pack Esencial',
    tagline: 'Perfecto para cumpleaños en casa o local pequeño',
    emotion: 'Buena música, buen sonido y un ambiente digno sin complicarse la vida.',
    price: '400€',
    priceValue: 400,
    priceOriginal: null,
    duration: 'Hasta 3 horas de DJ',
    features: [
      '🎵 DJ profesional hasta 3 horas',
      '🔊 2 altavoces de 2.000W (sistema total)',
      '💡 Iluminación LED multicolor',
      '🌫️ Máquina de humo',
      '📱 Selección musical personalizada',
      '🚚 Montaje y desmontaje incluidos',
    ],
    ideal: 'Hasta 80 personas',
    bestFor: 'Cumples en casa, locales pequeños, fiestas sencillas pero bien hechas',
    highlight: false,
    popular: false,
    badge: null,
    cta: 'Quiero el Pack Esencial',
  },
  {
    id: 'fiestas-despedida-plus',
    service: 'fiestas',
    slug: 'despedida-premium',
    name: '🍾 Pack Fiesta Plus',
    tagline: 'Para despedidas y fiestas con más ambiente',
    emotion: 'La fiesta se alarga, la luz acompaña y el ritmo no cae tan fácilmente.',
    price: '520€',
    priceValue: 520,
    priceOriginal: null,
    duration: 'Hasta 4 horas de DJ',
    features: [
      '✨ TODO lo del Pack Esencial',
      '⏱️ Hasta 4 horas de DJ',
      '🔊 2 altavoces (4.000W total)',
      '💡 4 Cabezas mobilesLed 150 Watt',
      '🌫️ Máquina de humo + efectos',
      '🎤 Multibox LED para pista',
      '📱 Playlist personalizada',
    ],
    ideal: '80-120 personas',
    bestFor: 'Despedidas, fiestas de 30/40, grupos grandes de amigos',
    highlight: true,
    popular: true,
    badge: '🔥 MÁS ELEGIDO',
    cta: 'Quiero Pack Fiesta Plus',
  },
  {
    id: 'fiestas-tematica-completa',
    service: 'fiestas',
    slug: 'tematica-completa',
    name: '🎭 Pack Fiesta Temática',
    tagline: 'Halloween, Años 80, Harry Potter... Tu rollo',
    emotion: 'No es solo una fiesta: tiene tema, momentos marcados y una estética cuidada.',
    price: '720€',
    priceValue: 720,
    priceOriginal: null,
    duration: 'Hasta 5 horas de DJ',
    features: [
      '🔥 TODO lo del Pack Fiesta Plus',
      '🎨 Tematización musical completa',
      '💡 Decoración lumínica temática',
      '💫 Efectos especiales coordinados',
      '🎵 Selección musical 100% personalizada',
      '⏱️ Hasta 5 horas de DJ',
      '📅 Reunión previa de planificación',
    ],
    ideal: '50-150 personas',
    bestFor: 'Halloween, fiestas frikis, disfraces, fiestas "una vez al año"',
    highlight: false,
    popular: false,
    badge: null,
    cta: 'Crear mi fiesta temática',
  },

  // ==========================================
  // BODAS
  // ==========================================
  {
    id: 'bodas-esencial',
    service: 'bodas',
    slug: 'boda-esencial',
    name: '🔥 Boda Esencial',
    tagline: 'Solo el baile - Lo esencial',
    emotion: 'La base sólida: DJ profesional, buen sonido y luces de fiesta.',
    price: '400€',
    priceValue: 400,
    priceOriginal: null,
    duration: 'Hasta 3 horas de baile',
    features: [
      '🎵 DJ profesional con lectura de pista',
      '🔊 Sistema de sonido 4.000W (2 altavoces EV)',
      '💡 Iluminación LED para pista',
      '🌫️ Máquina de humo + humo bajo',
      '📱 Planificación musical previa',
    ],
    ideal: 'Solo el baile final',
    bestFor: 'Bodas que quieren DJ solo para la fiesta nocturna',
    highlight: false,
    popular: false,
    badge: null,
    cta: 'Reservar Boda Esencial',
  },
  {
    id: 'bodas-premium',
    service: 'bodas',
    slug: 'boda-premium',
    name: '💎 Boda Premium',
    tagline: 'Ceremonia + Baile - El pack más vendido',
    emotion: 'Música desde el inicio: ceremonia emotiva + fiesta memorable.',
    price: '950€',
    priceValue: 950,
    priceOriginal: null,
    duration: 'Ceremonia + hasta 4h baile',
    features: [
      '✨ Todo lo de Boda Esencial',
      '💒 Música y sonido para ceremonia',
      '🍾 Música ambiente cóctel/banquete',
      '🎤 Micro inalámbrico para lecturas',
      '💡 4 cabezas mobiles led 150 watt',
      '📅 2 reuniones de planificación',
      '🫧 Burbujas para primer baile',
    ],
    ideal: 'Ceremonia + baile',
    bestFor: 'La mayoría de bodas que quieren todo cubierto',
    highlight: true,
    popular: true,
    badge: '⭐ MÁS VENDIDO',
    cta: 'Reservar Boda Premium',
  },
  {
    id: 'bodas-vip',
    service: 'bodas',
    slug: 'boda-vip',
    name: '👑 Boda VIP',
    tagline: 'Full Day - Ceremonia + Banquete + Fiesta',
    emotion: 'Música todo el día, coordinación total, cero preocupaciones.',
    price: '1.500€',
    priceValue: 1500,
    priceOriginal: null,
    duration: 'Todo el día (6-8h)',
    features: [
      '🔥 Todo lo de Boda Premium',
      '⏱️ DJ todo el día (ceremonia hasta cierre)',
      '🍽️ Música personalizada banquete',
      '📸 Coordinación con foto/vídeo',
      '💫 Efectos especiales extra',
      '👨‍💼 Técnico dedicado todo el evento',
      '♾️ Sin límite de reuniones',
    ],
    ideal: 'Todo el día',
    bestFor: 'Bodas que quieren experiencia completa sin preocupaciones',
    highlight: false,
    popular: false,
    badge: null,
    cta: 'Reservar Boda VIP',
  },

  // ==========================================
  // DISCOMÓVIL
  // ==========================================
  {
    id: 'discomovil-basica',
    service: 'discomobil',
    slug: 'fiesta-basica',
    name: '🎵 Fiesta Básica',
    tagline: 'Para fiestas de hasta 100 personas',
    emotion: 'Sonido claro, buena luz y DJ que sabe mover una pista.',
    price: '400€',
    priceValue: 400,
    priceOriginal: null,
    duration: 'Hasta 3 horas de DJ',
    features: [
      '🎵 DJ profesional',
      '🔊 2 altavoces potentes (2.000W)',
      '💡 Iluminación LED básica',
      '🌫️ Máquina de humo',
      '🎚️ Mesa DJ Pioneer',
    ],
    ideal: 'Hasta 100 personas',
    bestFor: 'Fiestas en locales pequeños, pisos, garajes acondicionados',
    highlight: false,
    popular: false,
    badge: null,
    cta: 'Quiero Fiesta Básica',
  },
  {
    id: 'discomovil-premium',
    service: 'discomobil',
    slug: 'fiesta-premium',
    name: '💫 Fiesta Premium',
    tagline: 'Para fiestas de 100-200 personas',
    emotion: 'Potencia real, luz que funciona y ambiente que aguanta toda la noche.',
    price: '590€',
    priceValue: 590,
    priceOriginal: null,
    duration: 'Hasta 4 hours de DJ',
    features: [
      '🎵 DJ profesional',
      '🔊 2 altavoces (4.000W)',
      '💡 Iluminación LED avanzada',
      '🌫️ Máquina de humo + efectos',
      '🎚️ Mesa DJ Pioneer',
      '✨ Multibox LED para pista',
    ],
    ideal: '100-200 personas',
    bestFor: 'Fiestas en locales medianos, pabellones, exteriores',
    highlight: true,
    popular: true,
    badge: '🔥 MÁS POPULAR',
    cta: 'Quiero Fiesta Premium',
  },
  {
    id: 'discomovil-vip',
    service: 'discomobil',
    slug: 'fiesta-vip',
    name: '🚀 Fiesta VIP',
    tagline: 'Nivel discoteca para 200+ personas',
    emotion: 'Setup profesional completo. Como una disco, pero en tu evento.',
    price: '790€',
    priceValue: 790,
    priceOriginal: null,
    duration: 'Hasta 5 horas de DJ',
    features: [
      '🎵 DJ profesional',
      '🔊 Sistema line array (6.000W+)',
      '💡 Iluminación profesional completa',
      '🌫️ Humo + efectos especiales',
      '🎚️ Mesa Pioneer + backup',
      '📺 Pantalla LED para visuales',
      '👨‍💼 Técnico de soporte',
    ],
    ideal: '200+ personas',
    bestFor: 'Eventos grandes, fiestas de pueblo, fiestas corporativas grandes',
    highlight: false,
    popular: false,
    badge: null,
    cta: 'Quiero Fiesta VIP',
  },

  // ==========================================
  // ALQUILER
  // ==========================================
  {
    id: 'alquiler-sonido-pro',
    service: 'alquiler',
    slug: 'sonido-pro',
    name: '🔊 Pack Sonido PRO',
    tagline: 'Sistema profesional para DJs',
    emotion: 'El mismo equipo que usamos nosotros, en tus manos.',
    price: '280€',
    priceValue: 280,
    priceOriginal: null,
    duration: 'Por día',
    features: [
      '🔊 2x Altavoces EV ETX-35P (3.000W)',
      '🔌 Cables XLR y conexiones',
      '🎚️ Trípodes reforzados',
      '🚚 Recogida y entrega incluidas',
    ],
    ideal: 'DJs con equipo propio que necesitan sonido PRO',
    bestFor: 'Eventos hasta 150 personas',
    highlight: false,
    popular: false,
    badge: null,
    cta: 'Alquilar Sonido PRO',
  },
  {
    id: 'alquiler-luces-led',
    service: 'alquiler',
    slug: 'luces-led',
    name: '💡 Pack Luces LED',
    tagline: 'Iluminación completa para pista',
    emotion: 'Luz profesional que hace que cualquier espacio parezca una pista real.',
    price: '220€',
    priceValue: 220,
    priceOriginal: null,
    duration: 'Por día',
    features: [
      '💡 4x Focos B-150 LED RGBW',
      '🎛️ Controlador DMX',
      '🔧 Estructura y cables',
      '🚚 Recogida y entrega incluidas',
    ],
    ideal: 'Eventos que necesitan luz profesional',
    bestFor: 'DJs, productoras, organizadores de eventos',
    highlight: false,
    popular: true,
    badge: null,
    cta: 'Alquilar Luces LED',
  },
  {
    id: 'alquiler-pioneer-ddj',
    service: 'alquiler',
    slug: 'pioneer-ddj',
    name: '🎚️ Mesa Pioneer DDJ',
    tagline: 'La mesa que usan los pros',
    emotion: 'La controladora estándar de la industria, lista para tu set.',
    price: '150€',
    priceValue: 150,
    priceOriginal: null,
    duration: 'Por día',
    features: [
      '🎛️ Pioneer DDJ-REV7 o similar',
      '💼 Maleta de transporte',
      '🔌 Cables USB incluidos',
      '🚚 Recogida y entrega incluidas',
    ],
    ideal: 'DJs que necesitan mesa profesional',
    bestFor: 'Eventos, sesiones, prácticas',
    highlight: false,
    popular: false,
    badge: null,
    cta: 'Alquilar Pioneer DDJ',
  },
  {
    id: 'alquiler-tecnico',
    service: 'alquiler',
    slug: 'tecnico',
    name: '👨‍💼 Técnico de Soporte',
    tagline: 'Para que no te comas la cabeza',
    emotion: 'Montamos, probamos, desmontamos. Tú solo preocúpate de pinchar.',
    price: '80€',
    priceValue: 80,
    priceOriginal: null,
    duration: 'Por día',
    features: [
      '🔧 Montaje completo del equipo',
      '🔊 Pruebas de sonido',
      '📦 Desmontaje incluido',
      '🆘 Resolución de incidencias',
    ],
    ideal: 'Cualquier alquiler que necesite soporte técnico',
    bestFor: 'DJs sin experiencia en montaje, eventos complejos',
    highlight: false,
    popular: false,
    badge: null,
    cta: 'Añadir Técnico',
  },

  // ==========================================
  // EMPRESAS
  // ==========================================
  {
    id: 'empresas-corporativo-basico',
    service: 'empresas',
    slug: 'corporativo-basico',
    name: '💼 Evento Corporativo Básico',
    tagline: 'Para eventos de empresa de hasta 100 personas',
    emotion: 'Presentación clara, sonido limpio, sin complicaciones técnicas.',
    price: '800€',
    priceValue: 800,
    priceOriginal: null,
    duration: 'Hasta 4 horas',
    features: [
      '🔊 Sonido profesional para presentaciones',
      '🎤 2 micros inalámbricos',
      '💡 Iluminación pro (4 cabezas moviles led)',
      '🎵 Música ambiente',
      '👨‍💼 Técnico durante el evento',
    ],
    ideal: 'Hasta 100 personas',
    bestFor: 'Presentaciones, teambuildings, eventos internos',
    highlight: false,
    popular: false,
    badge: null,
    cta: 'Solicitar Presupuesto',
  },
  {
    id: 'empresas-corporativo-premium',
    service: 'empresas',
    slug: 'corporativo-premium',
    name: '🏆 Evento Corporativo Premium',
    tagline: 'Para eventos de 100-300 personas',
    emotion: 'Setup profesional completo para que tu evento deje huella.',
    price: '1.500€',
    priceValue: 1500,
    priceOriginal: null,
    duration: 'Hasta 6 horas',
    features: [
      '🔊 Sonido line array profesional',
      '🎤 4 micros inalámbricos',
      '💡 Iluminación escénica completa',
      '📺 Pantalla LED para proyección',
      '🎵 DJ para networking/cena',
      '👨‍💼 Técnico dedicado',
    ],
    ideal: '100-300 personas',
    bestFor: 'Convenciones, lanzamientos de producto, galas',
    highlight: true,
    popular: true,
    badge: '⭐ RECOMENDADO',
    cta: 'Solicitar Presupuesto',
  },
  {
    id: 'empresas-corporativo-vip',
    service: 'empresas',
    slug: 'corporativo-vip',
    name: '👑 Producción Corporativa VIP',
    tagline: 'Para congresos y eventos de gran formato',
    emotion: 'Producción completa de alto nivel. Congreso, streaming, todo.',
    price: '3.000€',
    priceValue: 3000,
    priceOriginal: null,
    duration: 'Todo el día',
    features: [
      '🔥 Todo lo de Premium',
      '🎭 Escenario profesional',
      '📹 Streaming y grabación',
      '🎤 Coordinación con ponentes',
      '💫 Efectos especiales',
      '👨‍💼 Equipo técnico completo',
    ],
    ideal: '300+ personas',
    bestFor: 'Congresos, eventos institucionales, grandes producciones',
    highlight: false,
    popular: false,
    badge: null,
    cta: 'Solicitar Presupuesto',
  },
];

// ==========================================
// FUNCIONES HELPER
// ==========================================

export function getPacksByService(service: ServiceSlug): PackDefinition[] {
  return PACKS.filter((pack) => pack.service === service);
}

export function getPackById(id: PackId): PackDefinition | undefined {
  return PACKS.find((pack) => pack.id === id);
}

export function getAllPacks(): PackDefinition[] {
  return PACKS;
}

export function getMinPriceByService(service: ServiceSlug): number {
  const packs = PACKS.filter((p) => p.service === service);
  if (!packs.length) return 0;
  return Math.min(...packs.map((p) => p.priceValue));
}

// Helper para obtener extras por categoría
export function getExtrasByCategory(category: ExtraDefinition['category']): ExtraDefinition[] {
  return EXTRAS.filter((e) => e.category === category);
}

// Helper para calcular mejor oferta aplicable
export function getBestApplicableOffer(
  totalPrice: number,
  extrasCount: number,
  eventDate?: string
): OfferDefinition | null {
  const applicableOffers: OfferDefinition[] = [];

  // Verificar Early Bird
  if (totalPrice >= (OFFERS.earlyBird.minAmount || 0)) {
    applicableOffers.push(OFFERS.earlyBird);
  }

  // Verificar Combo
  if (extrasCount >= (OFFERS.combo.minExtras || 0)) {
    applicableOffers.push(OFFERS.combo);
  }

  // Verificar Temporada
  if (eventDate) {
    const month = new Date(eventDate).getMonth() + 1;
    if (OFFERS.seasonal.months?.includes(month)) {
      applicableOffers.push(OFFERS.seasonal);
    }
  }

  // Devolver la oferta con mayor descuento (mayor prioridad)
  if (applicableOffers.length === 0) return null;
  return applicableOffers.sort((a, b) => (b.priority || 0) - (a.priority || 0))[0];
}
