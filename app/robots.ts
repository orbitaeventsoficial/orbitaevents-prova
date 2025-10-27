// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://orbitaevents-prova.vercel.app";

  const isProd = base.includes("orbitaevents.cat");

  return {
    rules: isProd
      ? [
          { userAgent: "*", allow: "/" },
          { userAgent: "GPTBot", disallow: "/" }, // bloquea scraping IA si no lo deseas
        ]
      : [
          { userAgent: "*", disallow: "/" }, // bloquea indexación en entornos de prueba
        ],

    sitemap: isProd ? `${base}/sitemap.xml` : undefined,
    host: isProd ? base : undefined,
  };
}
