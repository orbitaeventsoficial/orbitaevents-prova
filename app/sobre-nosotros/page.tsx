import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: "Carles y Òrbita Events: técnica, música y emoción con los pies en el suelo.",
};

export default function NosotrosPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1">El alma de Òrbita</h1>
        <p className="p mt-6">No hacemos packs. Montamos experiencias. Técnica cuidada, sonido controlado y una obsesión sana por el detalle.</p>
      </div>
    </section>
  );
}
