// app/not-found.tsx
export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-main text-white px-4">
      {/* Glow dorado suave */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 60%, rgba(215,184,110,0.18), transparent 70%)",
          filter: "blur(90px)"
        }}
      />

      <div className="relative text-center backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-3xl p-10 max-w-md">
        <h1 className="text-6xl font-black mb-3 tracking-tight text-white">
          404
        </h1>
        <p className="text-white/70 mb-6">
          Esta página no existe o fue movida.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
        >
          Volver al inicio
        </a>
      </div>
    </main>
  );
}
