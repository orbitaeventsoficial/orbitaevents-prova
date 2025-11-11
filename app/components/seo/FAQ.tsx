import type { FC } from 'react';

type QA = { q: string; a: string };

interface FAQProps {
  items?: QA[];
  title?: string;
}

const DEFAULT_QA: QA[] = [
  { q: '¿Trabajáis fuera de Barcelona?', a: 'Sí, cubrimos toda Cataluña y desplazamientos bajo presupuesto.' },
  { q: '¿Ofrecéis DJ y técnica completa?', a: 'Sí, sonido, iluminación, microfonía, efectos y operación.' },
  { q: '¿Presupuestos cerrados?', a: 'Paquetes base con add-ons. Todo por contrato, sin sorpresas.' },
];

const FAQ: FC<FAQProps> = ({ items = DEFAULT_QA, title = 'Preguntas frecuentes' }) => {
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="mt-8 space-y-6">
        {items.map((item) => (
          <div key={item.q} className="rounded-xl border border-white/10 p-4">
            <h3 className="font-medium">{item.q}</h3>
            <p className="mt-2 text-white/70">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
