export default function Loading() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center bg-main text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 55%, rgba(215,184,110,0.15), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div className="relative text-center">
        <div className="mb-4 text-4xl animate-[spin_3.5s_linear_infinite]">🪐</div>
        <p className="text-white/70 tracking-wide text-lg">
          Cargando <span className="text-[#d7b86e]">Òrbita</span>…
        </p>
      </div>
    </div>
  );
}
