// app/robots.ts
import type { MetadataRoute } from "next";

/**
 * Genera robots.txt dinámico según entorno.
 * - En producción: acceso abierto + sitemap + host.
 * - En entorno de pruebas o staging: bloquea indexado.
 * - Opción de bloqueo específico a GPTBot (desactívalo si no te importa).
 */
export default function robots(): MetadataRoute.Robots {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://orbitaevents-prova.vercel.app";

  const isProd = base.includes("orbitaevents.cat");

  if (isProd) {
    return {
      rules: [
        { userAgent: "*", allow: "/" },
        // Bloquea scrapers de IA (opcional)
        { userAgent: "GPTBot", disallow: "/" },
      ],
      sitemap: `${base}/sitemap.xml`,
      host: base,
    };
  }

  // Entorno de desarrollo / Vercel preview / staging
  return {
    rules: [
      { userAgent: "*", disallow: "/" },
      // Permitimos el sitemap solo para comprobaciones manuales
      { userAgent: "Googlebot", disallow: "" },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
