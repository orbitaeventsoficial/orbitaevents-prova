// app/(seo)/structured-data.tsx
export default function LocalBusinessJsonLD() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://orbitaevents-prova.vercel.app";

  const json = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${base}#orbita-events`,
    "name": "Òrbita Events",
    "url": base,
    "logo": `${base}/img/brand/favicon.svg`,
    "image": [`${base}/img/og-orbita.jpg`],
    "description":
      "Productora técnica especializada en discomóvil, bodas y eventos. Sonido, iluminación y emoción con criterio.",
    "telephone": "+34 699 121 023",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Granollers",
      "addressLocality": "Barcelona",
      "addressRegion": "Catalunya",
      "postalCode": "08400",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.6066,
      "longitude": 2.2877
    },
    "areaServed": [
      "Barcelona",
      "Girona",
      "Tarragona",
      "Lleida",
      "Catalunya"
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "20:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/orbitaeventsoficial",
      "https://www.facebook.com/orbitaeventsoficial"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
