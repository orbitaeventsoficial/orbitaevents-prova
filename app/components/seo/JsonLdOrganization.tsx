// app/components/seo/JsonLdOrganization.tsx
export default function JsonLdOrganization() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Òrbita Events',
    alternateName: 'Orbita Events',
    url: 'https://orbitaevents.com',
    logo: 'https://orbitaeventcom/logo.png',
    image: 'https://orbitaevents.com/og-default.jpg',
    description:
      'Eventos profesionales en Catalunya: bodas, fiestas privadas, eventos corporativos. DJ profesional. Tematización de fiestas, efectos especiales. +150 eventos. 4.9/5 estrellas.',
    telephone: '+34699121023',
    email: 'info@orbitaevents.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Barcelona',
      addressRegion: 'Catalunya',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.3851,
      longitude: 2.1734,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Barcelona',
      },
      {
        '@type': 'City',
        name: 'Lleida',
      },
      {
        '@type': 'City',
        name: 'Girona',
      },
      {
        '@type': 'City',
        name: 'Tarragona',
      },
      {
        '@type': 'State',
        name: 'Catalunya',
      },
    ],
    sameAs: [
      'https://www.instagram.com/orbitaeventsoficial',
      'https://www.facebook.com/orbitaeventsoficial',
      // Añade más perfiles sociales si existen
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+34699121023',
      contactType: 'Customer Service',
      areaServed: 'ES',
      availableLanguage: ['Spanish', 'Catalan'],
      contactOption: 'TollFree',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '243',
      bestRating: '5',
      worstRating: '1',
    },
    priceRange: '€€',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '10:00',
        closes: '22:00',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios Òrbita Events',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bodas',
            description: 'DJ + luces + efectos para bodas épicas',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Discomóvil',
            description: 'DJ profesional + equipamiento para fiestas',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fiestas Privadas',
            description: 'Cumpleaños, despedidas y fiestas temáticas',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Eventos Corporativos',
            description: 'Team building, cenas empresa, presentaciones',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Producción Técnica',
            description: 'Montaje y operación técnica profesional',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Alquiler Equipamiento',
            description: 'Alquiler sonido, luces y equipamiento DJ',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
