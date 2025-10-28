// app/components/seo/ServiceJsonLD.tsx
import * as React from "react";

type Props = {
  name: string;                     // "Discomóvil profesional"
  slugPath: string;                 // "/servicios/discomobil" o "servicios/discomobil"
  description?: string;
  serviceType?: string | string[];  // "DJ" o ["DJ","Sonido"]
  areaServed?: string | string[];   // "Catalunya" o ["Barcelona","Girona"...]
  image?: string;                   // URL ABSOLUTA de imagen, ej: https://.../img/brand/og-square.jpg
};

export default function ServiceJsonLD({
  name,
  slugPath,
  description,
  serviceType,
  areaServed = "Catalunya",
  image,
}: Props): JSX.Element {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://orbitaevents-prova.vercel.app";

  // Normaliza el path a "/..."
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
    // Usa objeto con @id para referenciar página canónica
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    // Referencia a la Organization global por @id (defínela en tu StructuredData del <head>)
    provider: { "@type": "Organization", "@id": `${base}/#organization` },
    ...(image ? { image } : {}),
  } as const;

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
