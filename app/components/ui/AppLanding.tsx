// app/components/AppLanding.tsx
import Image from 'next/image';

export default function AppLanding() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid gap-10 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-h2">Producción con cabeza</h2>
          <p className="mt-4 text-white/70">
            Sonido, iluminación y operación en directo. Menos humo, más resultados.
          </p>
          <div className="mt-8 flex gap-4">
            <button>Pedír presupuesto</button>
            <button className="border border-[var(--border)] bg-transparent text-white hover:glow-gold">
              Ver portfolio
            </button>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-[var(--border)]">
          <Image
            src="/images/portfolio/caso1.jpg"
            alt="Montaje técnico en evento"
            width={1200}
            height={800}
            className="h-80 w-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
