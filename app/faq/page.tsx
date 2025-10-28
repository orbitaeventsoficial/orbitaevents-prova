// app/faq/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas frecuentes | Òrbita Events",
  description:
    "Resuelve tus dudas sobre nuestros servicios de sonido, iluminación y DJs para bodas y eventos. Todo lo que necesitas saber antes de contratar Òrbita Events.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Preguntas frecuentes | Òrbita Events",
    description:
      "Resuelve tus dudas sobre nuestros servicios de sonido, iluminación y DJs para bodas y eventos.",
    url: "/faq",
    images: [{ url: "/api/og?title=Preguntas%20frecuentes" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Preguntas frecuentes | Òrbita Events",
    description:
      "Resuelve tus dudas sobre nuestros servicios de sonido, iluminación y DJs para bodas y eventos.",
    images: ["/api/og?title=Preguntas%20frecuentes"]
  },
  robots: { index: true, follow: true }
};

export default function FAQPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 text-white">
      <h1 className="mb-8 text-3xl font-bold">Preguntas frecuentes</h1>

      <div className="space-y-8 text-white/80">
        <article>
          <h2 className="mb-2 text-xl font-semibold">
            ¿Qué incluye vuestro servicio de discomóvil?
          </h2>
          <p>
            Montaje completo de sonido profesional, iluminación ambiental y de
            pista, cabina de DJ personalizada, microfonía inalámbrica y
            técnico/DJ durante todo el evento. También nos encargamos de la
            coordinación técnica con el espacio y otros proveedores.
          </p>
        </article>

        <article>
          <h2 className="mb-2 text-xl font-semibold">
            ¿Con cuánta antelación debo reservar?
          </h2>
          <p>
            Para bodas y eventos grandes recomendamos reservar con al menos tres
            meses de antelación. En temporada alta (mayo a septiembre) las
            fechas se llenan rápido.
          </p>
        </article>

        <article>
          <h2 className="mb-2 text-xl font-semibold">
            ¿Puedo personalizar la música o enviar una playlist?
          </h2>
          <p>
            Por supuesto. Puedes enviarnos tus temas favoritos y nosotros
            construiremos la sesión manteniendo el estilo y la energía del
            evento. También puedes dejarlo totalmente en nuestras manos.
          </p>
        </article>

        <article>
          <h2 className="mb-2 text-xl font-semibold">
            ¿Qué pasa si el evento es al aire libre o hay limitador de sonido?
          </h2>
          <p>
            Tenemos equipos adaptables para exteriores y sistemas de control de
            volumen calibrados. Si el espacio tiene limitador, ajustamos el
            setup para que el sonido siga siendo limpio sin disparar el corte.
          </p>
        </article>

        <article>
          <h2 className="mb-2 text-xl font-semibold">
            ¿Ofrecéis servicio en toda Catalunya?
          </h2>
          <p>
            Sí. Trabajamos habitualmente en Barcelona, Girona, Tarragona y
            Lleida. También realizamos eventos fuera de Catalunya con logística
            planificada.
          </p>
        </article>

        <article>
          <h2 className="mb-2 text-xl font-semibold">
            ¿Cómo se realiza el pago y la reserva?
          </h2>
          <p>
            Se confirma la fecha con una señal inicial y el resto se abona una
            semana antes del evento. Emitimos factura y contrato con todos los
            detalles técnicos y horarios.
          </p>
        </article>
      </div>
    </section>
  );
}
