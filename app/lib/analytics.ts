/**
 * MANOLO'S ANALYTICS TRACKER
 * Sistema centralizado de tracking para Google Analytics 4 y Meta Pixel
 * 
 * Uso: import { trackEvent, trackLead, trackWhatsAppClick } from '@/lib/analytics';
 */

// Tipos TypeScript para ventana global
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Tipos de eventos principales
 */
export type EventCategory = 
  | 'Contact'
  | 'Pack Selection'
  | 'Engagement'
  | 'Navigation'
  | 'Video'
  | 'Calculator'
  | 'CTA';

export type EventName = 
  | 'generate_lead'
  | 'contact_whatsapp'
  | 'contact_phone'
  | 'select_pack'
  | 'scroll'
  | 'view_video_testimonial'
  | 'calculate_price'
  | 'click_cta'
  | 'page_view';

/**
 * Interface para eventos personalizados
 */
interface TrackEventParams {
  eventName: EventName;
  eventCategory: EventCategory;
  eventLabel?: string;
  value?: number;
  additionalParams?: Record<string, any>;
}

/**
 * Verifica si estamos en el lado del cliente y en producción
 */
const isClientSide = (): boolean => typeof window !== 'undefined';
const isProduction = (): boolean => process.env.NODE_ENV === 'production';

/**
 * Función universal para trackear cualquier evento
 * Se envía a Google Analytics Y Meta Pixel simultáneamente
 */
export const trackEvent = ({
  eventName,
  eventCategory,
  eventLabel,
  value,
  additionalParams = {},
}: TrackEventParams): void => {
  if (!isClientSide() || !isProduction()) {
    console.log('📊 [DEV] Track Event:', { eventName, eventCategory, eventLabel, value });
    return;
  }

  // 📊 GOOGLE ANALYTICS 4
  if (window.gtag) {
    window.gtag('event', eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: value,
      ...additionalParams,
    });
  }

  // 📊 META PIXEL
  if (window.fbq) {
    const metaEventMap: Record<string, string> = {
      generate_lead: 'Lead',
      contact_whatsapp: 'Contact',
      contact_phone: 'Contact',
      select_pack: 'InitiateCheckout',
      calculate_price: 'CustomizeProduct',
      view_video_testimonial: 'ViewContent',
    };

    const metaEvent = metaEventMap[eventName] || 'CustomEvent';
    
    window.fbq('track', metaEvent, {
      content_name: eventLabel,
      content_category: eventCategory,
      value: value,
      currency: 'EUR',
      ...additionalParams,
    });
  }
};

/**
 * IMPORTS ESENCIALES: packs-config es TU FUENTE DE VERDAD
 */
import { getPackById, PackId } from '@/data/packs-config'; // ← AJUSTA RUTA SI ES NECESARIO

/**
 * OBTENER VALOR REAL DEL PACK (fuente única de verdad)
 */
const getRealPackValue = (packId: PackId): number => {
  const pack = getPackById(packId);
  return pack?.priceValue || 0;
};

/**
 * TRACKEAR LEAD GENERADO (conversión principal)
 * AHORA USA PRECIO REAL DEL PACK SI SE SELECCIONÓ
 */
export const trackLead = (data: {
  eventType: string;
  estimatedValue?: number;
  source?: string;
  packId?: PackId; // ← NUEVO: opcional, pero ORO PURO
}): void => {
  const { eventType, estimatedValue, source, packId } = data;

  // PRIORIDAD: packId real > estimatedValue > fallback seguro
  let finalValue = estimatedValue;

  if (packId) {
    finalValue = getRealPackValue(packId);
  } else if (!finalValue) {
    // Fallback basado en packs más vendidos (NO hardcodeado en analytics)
    const fallback: Record<string, number> = {
      boda: 950,     // Boda Premium
      empresa: 1500, // Corporativo Premium
      fiesta: 520,   // Fiesta Plus
      discomovil: 590,
      alquiler: 180,
      default: 500,
    };
    finalValue = fallback[eventType.toLowerCase()] || fallback.default;
  }

  trackEvent({
    eventName: 'generate_lead',
    eventCategory: 'Contact',
    eventLabel: eventType,
    value: finalValue,
    additionalParams: {
      lead_source: source || 'contact_form',
      event_type: eventType,
      ...(packId && { pack_id: packId, pack_value: finalValue }),
    },
  });

  console.log('🎯 LEAD GENERADO:', { ...data, finalValue });
};

/**
 * TRACKEAR CLICK EN WHATSAPP
 */
export const trackWhatsAppClick = (source: string = 'generic'): void => {
  trackEvent({
    eventName: 'contact_whatsapp',
    eventCategory: 'Contact',
    eventLabel: `WhatsApp - ${source}`,
    additionalParams: {
      contact_method: 'whatsapp',
      source: source,
    },
  });
};

/**
 * TRACKEAR CLICK EN TELÉFONO
 */
export const trackPhoneClick = (source: string = 'generic'): void => {
  trackEvent({
    eventName: 'contact_phone',
    eventCategory: 'Contact',
    eventLabel: `Phone - ${source}`,
    additionalParams: {
      contact_method: 'phone',
      source: source,
    },
  });
};

/**
 * TRACKEAR SELECCIÓN DE PACK
 * OBLIGATORIO: packId real → precio 100% actualizado
 */
export const trackPackSelection = (data: {
  packId: PackId;
  packType: 'boda' | 'empresa' | 'fiesta' | 'discomovil' | 'alquiler';
}): void => {
  const pack = getPackById(data.packId);
  if (!pack) {
    console.warn(`[Analytics] Pack no encontrado: ${data.packId}`);
    return;
  }

  const price = pack.priceValue;

  trackEvent({
    eventName: 'select_pack',
    eventCategory: 'Pack Selection',
    eventLabel: pack.name,
    value: price,
    additionalParams: {
      pack_id: data.packId,
      pack_type: data.packType,
      pack_name: pack.name,
      price: price,
    },
  });
};

/**
 * TRACKEAR SCROLL DEPTH (profundidad de scroll)
 */
export const trackScrollDepth = (percentage: number): void => {
  trackEvent({
    eventName: 'scroll',
    eventCategory: 'Engagement',
    eventLabel: `${percentage}%`,
    value: percentage,
    additionalParams: {
      scroll_depth: percentage,
    },
  });
};

/**
 * TRACKEAR VISUALIZACIÓN DE VIDEO TESTIMONIAL
 */
export const trackVideoView = (videoTitle: string): void => {
  trackEvent({
    eventName: 'view_video_testimonial',
    eventCategory: 'Video',
    eventLabel: videoTitle,
    additionalParams: {
      video_title: videoTitle,
    },
  });
};

/**
 * TRACKEAR USO DE CALCULADORA
 */
export const trackCalculatorUse = (data: {
  eventType: string;
  calculatedPrice: number;
  duration: number;
  guests: number;
  packId?: PackId;
}): void => {
  const { eventType, calculatedPrice, duration, guests, packId } = data;

  trackEvent({
    eventName: 'calculate_price',
    eventCategory: 'Calculator',
    eventLabel: eventType,
    value: calculatedPrice,
    additionalParams: {
      event_type: eventType,
      calculated_price: calculatedPrice,
      duration_hours: duration,
      guest_count: guests,
      ...(packId && { pack_id: packId }),
    },
  });
};

/**
 * TRACKEAR CLICK EN CTA (Call To Action)
 */
export const trackCTAClick = (ctaLabel: string, ctaLocation: string): void => {
  trackEvent({
    eventName: 'click_cta',
    eventCategory: 'CTA',
    eventLabel: ctaLabel,
    additionalParams: {
      cta_location: ctaLocation,
      cta_text: ctaLabel,
    },
  });
};

/**
 * TRACKEAR PAGE VIEW (útil para SPAs con navegación dinámica)
 */
export const trackPageView = (pagePath: string, pageTitle: string): void => {
  if (!isClientSide() || !isProduction()) return;

  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }

  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
};

/**
 * INICIALIZAR ANALYTICS (llamar en layout o _app)
 */
export const initAnalytics = (): void => {
  if (!isClientSide()) return;

  console.log('📊 Analytics initialized:', {
    GA4: !!window.gtag,
    MetaPixel: !!window.fbq,
    Environment: process.env.NODE_ENV,
  });
};