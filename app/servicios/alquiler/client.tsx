function JsonLD() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://orbitaevents.cat";

  const json = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Product",
          "name": "Pack Básico Sonido + Luz",
          "description": "Sistema compacto para pisos o terrazas pequeñas. Sonido nítido y luz cálida.",
          "brand": { "@type": "Brand", "name": "Òrbita Events" },
          "url": `${base}/servicios/alquiler#pack-basico`,
          "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "price": "79",
            "availability": "https://schema.org/InStock",
            "url": `${base}/contacto`,
            "priceValidUntil": `${new Date(new Date().getFullYear(), 11, 31).toISOString().slice(0,10)}`
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Product",
          "name": "Pack Estándar Fiesta",
          "description": "Para 50–120 pax. Sonido con subgrave y luz con efectos moderados.",
          "brand": { "@type": "Brand", "name": "Òrbita Events" },
          "url": `${base}/servicios/alquiler#pack-estandar`,
          "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "price": "149",
            "availability": "https://schema.org/InStock",
            "url": `${base}/contacto`,
            "priceValidUntil": `${new Date(new Date().getFullYear(), 11, 31).toISOString().slice(0,10)}`
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Product",
          "name": "Pack Pro Evento",
          "description": "Para 120–250 pax. PA con pegada, luz diseñada y humo controlado.",
          "brand": { "@type": "Brand", "name": "Òrbita Events" },
          "url": `${base}/servicios/alquiler#pack-pro`,
          "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "price": "289",
            "availability": "https://schema.org/InStock",
            "url": `${base}/contacto`,
            "priceValidUntil": `${new Date(new Date().getFullYear(), 11, 31).toISOString().slice(0,10)}`
          }
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      // @ts-expect-error
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
