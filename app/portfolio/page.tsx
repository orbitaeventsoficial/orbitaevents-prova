// app/portfolio/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio | Òrbita Events",
  description:
    "Selección de bodas, fiestas y eventos producidos por Òrbita Events. Sonido limpio, luz cuidada y ejecución impecable.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio | Òrbita Events",
    description:
      "Bodas, fiestas y eventos reales: sonido limpio, iluminación cuidada y pista encendida.",
    url: "/portfolio",
    type: "website",
    images: [{ url: "/api/og?title=Portfolio" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Òrbita Events",
    description:
      "Bodas, fiestas y eventos reales: sonido limpio, iluminación cuidada y pista encendida.",
    images: ["/api/og?title=Portfolio"]
  },
  robots: { index: true, follow: true }
};

type CasePreview = {
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  tags: string[];
};

const CASES: CasePreview[] = [
  {
    slug: "boda-bosque-canoves",
    title: "Boda en el bosque, Cànoves",
    subtitle: "Ceremonia + cóctel + fiesta",
    cover: "/img/portfolio/shot-01.jpg",
    tags: ["Boda", "Iluminación", "DJ"]
  },
  {
    slug: "fiesta-empresa-barcelona",
    title: "Cena de empresa, Barcelona",
    subtitle: "Show + discomóvil",
    cover: "/img/portfolio/shot-02.jpg",
    tags: ["Empresa", "Sonido", "Efectos"]
  },
  {
    slug: "cumple-18-arenys",
    title: "Cumpleaños 18, Arenys",
    subtitle: "Temazos + luces + humo",
    cover: "/img/portfolio/shot-03.jpg",
    tags: ["Fiesta", "Láser", "Set DJ"]
  }
];

// BlurDataURL para evitar parpadeo
const BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2P8z8DwHwAFhAK2Dq6HbwAAAABJRU5ErkJggg==";

// Base absoluta para JSON-LD
const BASE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://orbitaevents-prova.vercel.app";

/* JSON-LD con URLs absolutas */
function PortfolioJsonLD() {
  const payload = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: CASES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}/portfolio/${c.slug}`,
      name: c.title
    }))
  });

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}

export default function PortfolioIndex() {
  return (
    <main className="mx-auto max-w-7xl px-4 pt-24 pb-16">
      <PortfolioJsonLD />

      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white">Portfolio</h1>
        <p className="mt-3 text-white/70">
          Eventos reales. Montaje profesional, sonido limpio y pista encendida.
        </p>
      </header>

      <ul className="grid gap-6 md:grid-cols-3">
        {CASES.map((c, idx) => (
          <li
            key={c.slug}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur"
          >
            <Link
              href={`/portfolio/${c.slug}`}
              className="block focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label={`Ver detalle de ${c.title}`}
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={c.cover}
                  alt={`${c.title} — ${c.subtitle}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={idx === 0}
                  placeholder="blur"
                  blurDataURL={BLUR}
                  decoding="async"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40"
                  aria-hidden
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white">{c.title}</h3>
                <p className="text-sm text-white/70">{c.subtitle}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 px-2 py-1 text-xs text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5">
                  <span className="inline-flex items-center rounded-xl border border-white/20 px-4 py-2 text-sm text-white group-hover:bg-white/10">
                    Ver detalle
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 text-center">
        <Link
          href="/contacto"
          className="inline-flex items-center rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10"
        >
          ¿Hacemos el tuyo?
        </Link>
      </div>
    </main>
  );
}
