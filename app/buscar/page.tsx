import Link from "next/link";

export default function BuscarPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = (searchParams.q || "").trim().toLowerCase();

  // Simulación básica: redirige a servicios según palabras clave
  const suggestions =
    q.includes("boda") || q.includes("wedding")
      ? [{ href: "/servicios/bodas", label: "Bodas (DJ + sonido + luz)" }]
      : q.includes("disco") || q.includes("dj")
      ? [{ href: "/servicios/discomobil", label: "Discomóvil / DJ" }]
      : q.includes("empresa") || q.includes("corporativo")
      ? [{ href: "/servicios/empresas", label: "Eventos de empresa" }]
      : [
          { href: "/servicios", label: "Servicios" },
          { href: "/portfolio", label: "Portfolio" },
          { href: "/contacto", label: "Contacto" },
        ];

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">Resultados de búsqueda</h1>
      <p className="mt-2 text-white/70">Término: <strong>{q || "—"}</strong></p>
      <ul className="mt-6 space-y-3">
        {suggestions.map((s) => (
          <li key={s.href}>
            <Link className="oe-btn" href={s.href}>
              {s.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
