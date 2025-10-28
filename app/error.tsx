// app/error.tsx
"use client";
export default function Error({ error }: { error: Error }) {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">Algo ha fallado</h1>
      <p className="mt-3 text-white/70">{error?.message || "Error desconocido."}</p>
      <a href="/contacto" className="oe-btn oe-btn-gold mt-6">Contáctanos</a>
    </main>
  );
}
