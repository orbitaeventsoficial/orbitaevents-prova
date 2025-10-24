export const metadata = { title: "Serveis | Òrbita Events" }
export default function Page() {
  return (
    <section>
      <h1 className="mb-2 text-3xl font-bold">Serveis</h1>
      <p className="text-secundari/70">Tria una línia de servei.</p>
      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <li className="rounded-xl border border-white/10 p-4"><a href="/serveis/bodes">Bodes</a></li>
        <li className="rounded-xl border border-white/10 p-4"><a href="/serveis/festes-tematiques">Festes temàtiques</a></li>
        <li className="rounded-xl border border-white/10 p-4"><a href="/serveis/empreses">Empreses</a></li>
        <li className="rounded-xl border border-white/10 p-4"><a href="/serveis/lloguer">Lloguer</a></li>
      </ul>
    </section>
  )
}
