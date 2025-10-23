"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <section className="section">
      <div className="container grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="h1">
            Eventos reales, hechos con las manos, la cabeza y el alma.
          </h1>
          <p className="p mt-6">
            Discomóvil, tematizaciones y bodas. Técnica impecable, cero humo barato.
            Bueno, salvo el de la máquina.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/bodas" className="btn-primary">
              Bodas
            </Link>
            <Link href="/fiestas-tematicas" className="btn-primary">
              Fiestas temáticas
            </Link>
            <Link href="/empresas" className="btn-primary">
              Empresas
            </Link>
            <Link href="/contacto" className="btn-primary">
              Contacto
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full card p-6">
          <div className="h-full w-full grid place-items-center">
            <div className="text-center">
              <p className="uppercase tracking-widest text-oe-gray">
                Técnica · Música · Emoción
              </p>
              <h2 className="h2 mt-4">
                La pista manda. Tú mandas la pista.
              </h2>
            </div>
          </div>
          <Image
            src="/img/brand/favicon.svg"
            alt="Logo Òrbita"
            width={200}
            height={200}
            className="absolute right-6 bottom-6 opacity-80"
            priority
          />
        </div>
      </div>
    </section>
  );
}
