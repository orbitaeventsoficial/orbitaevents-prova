// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">Página no encontrada</h1>
      <p className="mt-3 text-white/70">Vuelve al inicio o pídenos presupuesto.</p>
      <div className="mt-6 flex gap-3 justify-center">
        <Link href="/" className="oe-btn">Inicio</Link>
        <Link href="/contacto" className="oe-btn oe-btn-gold">Pide presupuesto</Link>
      </div>
    </main>
  );
}
