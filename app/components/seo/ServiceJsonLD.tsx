// app/components/seo/ServiceJsonLD.tsx
import * as React from "react";

type Props = {
  name: string;                   // "Discomóvil profesional"
  slugPath: string;               // "/servicios/discomobil" o "servicios/discomobil"
  description?: string;
  serviceType?: string | string[]; // "DJ" o ["DJ","Sonido"]
  areaServed?: string | string[];  // "Catalunya" o ["Barcelona","Girona"...]
  brandName?: string;
};

export default function ServiceJsonLD({
  name,
  slugPath,
  description,
  serviceType,
  areaServed = "Catalunya",
  brandName = "Òrbita Events",
}: Props): JSX.Element {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://orbitaevents-prova.vercel.app";

  // Normaliza el path: siempre con prefijo "/"
  const normPath = slugPath.startsWith("/") ? slugPath : `/${slugPath}`;
  const url = `${base}${normPath}`;

  // Normaliza arrays
  const serviceTypeNorm =
    Array.isArray(serviceType) ? serviceType : serviceType ? [serviceType] : undefined;
  const areaServedNorm =
    Array.isArray(areaServed) ? areaServed : areaServed ? [areaServed] : undefined;

  const json = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    ...(description ? { description } : {}),
    ...(serviceTypeNorm ? { serviceType: serviceTypeNorm } : {}),
    ...(areaServedNorm ? { areaServed: areaServedNorm } : {}),
    url,
    mainEntityOfPage: url,
    provider: {
      "@type": "Organization",
      name: brandName,
      url: base,
      brand: { "@type": "Brand", name: brandName },
    },
    brand: { "@type": "Brand", name: brandName },
  } as const;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
