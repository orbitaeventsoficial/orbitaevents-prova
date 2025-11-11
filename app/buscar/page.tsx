// app/buscar/page.tsx
'use client';
import Link from 'next/link';

export default function BuscarPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = (searchParams.q || '').trim().toLowerCase();

  // Simulación avanzada con typo tolerance
  const allSuggestions = [
    { href: '/servicios/bodas', label: 'Bodas (DJ + sonido + luz)' },
    { href: '/servicios/discomovil', label: 'Discomóvil / DJ' },
    { href: '/servicios/empresas', label: 'Eventos de empresa' },
    { href: '/faq', label: 'Preguntas frecuentes' },
    { href: '/opiniones', label: 'Opiniones clientes' },
    { href: '/servicios', label: 'Todos los servicios' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contacto', label: 'Contacto' },
  ];

  const suggestions = allSuggestions.filter(
    (s) =>
      s.label.toLowerCase().includes(q) ||
      q.includes(s.label.toLowerCase().substring(0, 3)) ||
      q === ''
  );

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-white">Resultados de búsqueda</h1>
      <p className="mt-2 text-white/70">
        Término: <strong className="text-gold">{q || '—'}</strong>
      </p>

      {suggestions.length > 0 ? (
        <ul className="mt-6 space-y-3">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="oe-btn block text-left w-full">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-white/70">
          No hay resultados. Prueba con <strong>"bodas"</strong>, <strong>"dj"</strong> o <strong>"empresa"</strong>.
        </p>
      )}

      <div className="mt-8 text-center">
        <Link href="/contacto" className="oe-btn oe-btn-gold inline-block">
          💬 Pregúntanos directamente
        </Link>
      </div>
    </main>
  );
}
