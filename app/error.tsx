"use client";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-32 text-center text-white">
      <h1 className="text-4xl font-black mb-3">Algo ha fallado</h1>
      <p className="text-white/70 mb-6">{error.message}</p>
      <button onClick={() => location.reload()} className="underline">
        Recargar
      </button>
    </main>
  );
}
