import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Eventos para empresas con oficio",
  description: "Presentaciones, cenas, galas o team building. Sin circo innecesario, salvo cuando toca hacer circo.",
};

export default function Page() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1">Eventos para empresas con oficio</h1>
        <p className="p mt-6">Presentaciones, cenas, galas o team building. Sin circo innecesario, salvo cuando toca hacer circo.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="card p-6"><h3 className="h2 text-xl">Producción</h3><p className="p mt-2">Sonido limpio, iluminación dinámica y control real de ritmo.</p></div>
          <div className="card p-6"><h3 className="h2 text-xl">Música</h3><p className="p mt-2">Selección con criterio, temazos recientes y peticiones en vivo.</p></div>
          <div className="card p-6"><h3 className="h2 text-xl">Extras</h3><p className="p mt-2">Máquina de humo, efectos de escena y detalles que suman.</p></div>
        </div>
        <div className="mt-10"><Link href="/contacto" className="btn-primary">Pide propuesta</Link></div>
      </div>
    </section>
  );
}
