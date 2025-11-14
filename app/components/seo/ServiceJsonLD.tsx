// app/components/seo/ServiceJsonLD.tsx
// 🔥 MANOLO VERSION - Optimizado para conversión SEO

type AggregateRating = {
  '@type': 'AggregateRating';
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
};

type CustomOffer = {
  '@type': 'Offer';
  name?: string;
  price: string;
  priceCurrency?: string;
  description?: string;
  availability?: string;
  url?: string;
};

interface Props {
  name: string;
  slugPath: string;
  description: string;
  serviceType: string[];
  areaServed: string[];
  priceFrom?: string;
  priceCurrency?: string;
  availability?: string;
  aggregateRating?: { ratingValue: number; reviewCount: number };
  // 🔥 NUEVA: Acepta múltiples ofertas para mostrar paquetes
  offers?: CustomOffer[];
}

export default function ServiceJsonLD({
  name,
  slugPath,
  description,
  serviceType,
  areaServed,
  priceFrom,
  priceCurrency = 'EUR',
  availability = 'https://schema.org/InStock',
  aggregateRating,
  offers, // 🔥 Prop opcional para múltiples ofertas
}: Props) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://orbitaevents.com';
  const url = `${base}${slugPath}`;

  // 🔥 LÓGICA: Si hay offers custom, úsalos. Si no, genera el default simple
  const offersData = offers && offers.length > 0
    ? offers.map(offer => ({
        '@type': 'Offer' as const,
        name: offer.name,
        price: offer.price,
        priceCurrency: offer.priceCurrency || priceCurrency,
        description: offer.description,
        availability: offer.availability || availability,
        url: offer.url || url,
        seller: { '@type': 'Organization' as const, name: 'Órbita Events' },
      }))
    : {
        '@type': 'Offer' as const,
        url,
        priceCurrency,
        ...(priceFrom ? { price: priceFrom } : {}),
        availability,
        seller: { '@type': 'Organization' as const, name: 'Órbita Events' },
      };

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    url,
    image: `${base}/api/og?title=${encodeURIComponent(name)}`,
    areaServed: areaServed.map(a => ({ '@type': 'Place', name: a })),
    offers: offersData,
    provider: {
      '@type': 'Organization',
      name: 'Órbita Events',
      url: base,
      logo: `${base}/og.jpg`,
      sameAs: [
        'https://instagram.com/orbitaeventsoficial',
        'https://tiktok.com/@orbitaeventsoficial',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+34699121023',
        contactType: 'customer service',
        email: 'info@orbitaevents.com',
        availableLanguage: ['Spanish', 'Catalan'],
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Barcelona',
        addressRegion: 'Catalunya',
        addressCountry: 'ES',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '20:00',
        },
      ],
    },
    ...(aggregateRating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: aggregateRating.ratingValue,
            reviewCount: aggregateRating.reviewCount,
            bestRating: 5,
            worstRating: 1,
          } as AggregateRating,
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
