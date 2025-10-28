// app/opiniones/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Opiniones reales | Òrbita Events",
  description:
    "Valoraciones y experiencias de clientes. Transparencia, constancia y resultados medibles.",
  alternates: { canonical: "/opiniones" },
  openGraph: {
    title: "Opiniones reales | Òrbita Events",
    description:
      "Reseñas verificadas de bodas, fiestas y eventos de empresa. Sonido limpio, montaje impecable y pista encendida.",
    url: "/opiniones",
    type: "website",
    images: [{ url: "/api/og?title=Opiniones%20reales" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Opiniones reales | Òrbita Events",
    description:
      "Reseñas verificadas de bodas, fiestas y eventos de empresa. Sonido limpio, montaje impecable y pista encendida.",
    images: ["/api/og?title=Opiniones%20reales"]
  },
  robots: { index: true, follow: true }
};

type Review = {
  author: string;
  role?: string;   // pareja, cumple, empresa…
  event: string;   // tipo + lugar
  rating: number;  // 1..5 entero
  date: string;    // YYYY-MM
  text: string;
};

const REVIEWS: Review[] = [
  {
    author: "Lorena & Carlos",
    role: "Boda",
    event: "Boda mediodía — Cànoves",
    rating: 5,
    date: "2025-07",
    text:
      "Montaje elegante y cero problemas. Ceremonia clara, cóctel con música a nuestro estilo y una fiesta donde no se sentó ni el cura."
  },
  {
    author: "Marta",
    role: "Cumple 18",
    event: "Cumpleaños — Arenys",
    rating: 5,
    date: "2025-08",
    text:
      "Temazos sin parar, luces brutales y volumen perfecto. Los vecinos saludaron al día siguiente. Increíble."
  },
  {
    author: "Kreative Labs",
    role: "Empresa",
    event: "Cena de empresa — Barcelona",
    rating: 5,
    date: "2025-06",
    text:
      "Timing milimétrico para speeches y entrega de premios. Luego sesión abierta, cero baches. Nos quedamos cortos de pies."
  },
  {
    author: "Anna & Pau",
    role: "Boda",
    event: "Masía — Osona",
    rating: 5,
    date: "2025-05",
    text:
      "La ceremonia sonó perfecta pese al viento. En el baile, lectura de público finísima. Nada de ‘Gasolina’ a destiempo."
  },
  {
    author: "Sergio",
    role: "Fiesta privada",
    event: "Terraza — Granollers",
    rating: 5,
    date: "2025-04",
    text:
      "Equipo compacto pero con pegada. Humo controlado, láser medido y cero sustos con los vecinos. Profesional de verdad."
  },
  {
    author: "Marina",
    role: "Boda",
    event: "Viñedo — Penedès",
    rating: 5,
    date: "2024-09",
    text:
      "Coordinación con catering y fotógrafo impecable. Entradas, vals y fiesta sin silencios incómodos. Ni un cable fuera de sitio."
  },
  {
    author: "ITW Group",
    role: "Empresa",
    event: "Kickoff — Sant Cugat",
    rating: 5,
    date: "2024-11",
    text:
      "Sonido para 200 y microfonía sin acoples. Visuales corporativos y cierre con hits internacionales. Feedback interno 9,4/10."
  },
  {
    author: "Judit",
    role: "Bautizo + comida",
    event: "Masía — Maresme",
    rating: 5,
    date: "2024-05",
    text:
      "Volumen perfecto para comer y animación justa para levantar a la familia. Todo limpio y ordenado. Cero dramas."
  },
  {
    author: "Álvaro",
    role: "Fiesta 40",
    event: "Interior — Barcelona",
    rating: 5,
    date: "2024-10",
    text:
      "Selección 90s + actuales mezcladas sin postureo. Luces con gusto y sin feria. Repetimos el año que viene."
  }
];

// Media a 1 decimal
const AVG = Math.round(
  (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length) * 10
) / 10;

function Stars({ n }: { n: number }) {
  const safe = Math.max(0, Math.min(5, Math.floor(n)));
  return (
    <span aria-label={`${safe} de 5`} className="text-amber-300">
      {"★★★★★".slice(0, safe)}
      <span className="text-white/25">
        {"★★★★★".slice(0, 5 - safe)}
      </span>
    </span>
  );
}

// JSON-LD: AggregateRating + Review list
function ReviewsJsonLD() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Product", // usar “Product/Service” habilita rich results de valoración
    name: "Servicios de DJ, sonido e iluminación — Òrbita Events",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: AVG,
      reviewCount: REVIEWS.length,
      bestRating: 5,
      worstRating: 1
    },
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      author: { "@type": "Person", name: r.author },
      reviewBody: r.text,
      datePublished: `${r.date}-01`
    }))
  } as const;

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function PageOpiniones() {
  return (
    <main className="mx-auto max-w-6xl px-4 pt-24 pb-20 text-white">
      <ReviewsJsonLD />

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black">Opiniones</h1>
        <p className="mt-2 max-w-2xl text-white/75">
          Reseñas verificadas de bodas, fiestas y eventos de empresa. Lo que prometemos el martes, lo cumplimos el sábado.
        </p>
      </header>

      {/* Resumen */}
      <section className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-3xl font-extrabold" aria-label={`Media ${AVG} sobre 5`}>
            {AVG}
          </div>
          <Stars n={5} />
          <div className="text-sm text-white/70">
            {REVIEWS.length} opiniones verificadas · 5 es la nota máxima
          </div>
        </div>
      </section>

      {/* Lista de reseñas */}
      <ul className="grid gap-5 md:grid-cols-2">
        {REVIEWS.map((r, i) => (
          <li
            key={i}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
            itemScope
            itemType="https://schema.org/Review"
          >
            <div className="flex items-center justify-between">
              <div className="font-semibold" itemProp="author">
                {r.author}
              </div>
              <time className="text-sm text-white/60" dateTime={`${r.date}-01`}>
                {r.date}
              </time>
            </div>
            <div className="mt-0.5 text-xs text-white/50">
              {r.role} · {r.event}
            </div>
            <div className="mt-2">
              <Stars n={r.rating} />
            </div>
            <p className="mt-3 leading-relaxed text-white/80" itemProp="reviewBody">
              {r.text}
            </p>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link
          href="/contacto"
          className="inline-flex items-center rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10"
        >
          Pide disponibilidad y precio cerrado
        </Link>
      </div>
    </main>
  );
}
