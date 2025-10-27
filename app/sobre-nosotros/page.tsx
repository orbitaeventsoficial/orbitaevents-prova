// app/nosotros/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros | Òrbita Events",
  description:
    "Òrbita Events: técnica, música y emoción con los pies en el suelo. No hacemos packs, montamos experiencias.",
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: "Sobre nosotros | Òrbita Events",
    description:
      "Òrbita Events: técnica, música y emoción con los pies en el suelo. No hacemos packs, montamos experiencias.",
    url: "/nosotros",
    images: [{ url: "/api/og?title=Sobre%20nosotros" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre nosotros | Òrbita Events",
    description:
      "Òrbita Events: técnica, música y emoción con los pies en el suelo. No hacemos packs, montamos experiencias.",
    images: ["/api/og?title=Sobre%20nosotros"]
  },
  robots: { index: true, follow: true }
};

export default function NosotrosPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 text-white">
      <h1 className="mb-6 text-4xl font-black tracking-tight md:text-5xl">
        El alma de Òrbita
      </h1>

      <p className="mb-8 text-lg text-white/80">
        No hacemos packs. Montamos experiencias. Técnica cuidada, sonido
        controlado y una obsesión sana por el detalle.
      </p>

      <p className="text-base text-white/70">
        Somos técnicos, DJs y productores. Nos importan los tiempos, los cables
        y las emociones. En cada evento buscamos equilibrio entre oficio y
        energía. Lo que pasa en Òrbita no se improvisa: se prepara, se mide y
        se ejecuta.
      </p>

      <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="mb-2 text-2xl font-semibold text-white">
          Nuestra filosofía
        </h2>
        <p className="text-sm leading-relaxed text-white/75">
          Lo que ves, suena. Lo que suena, se siente. Y lo que se siente, se
          recuerda. Trabajamos con calma, criterio y el tipo de precisión que
          hace que el público ni se dé cuenta de que todo salió perfecto.
        </p>
      </div>
    </section>
  );
}
