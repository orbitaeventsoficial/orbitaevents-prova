import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cuéntanos qué quieres montar y te decimos cómo hacerlo posible.",
};

export default function ContactoPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1">Empieza aquí tu evento</h1>
        <form className="mt-8 grid gap-4 max-w-xl">
          <input className="card p-4" placeholder="Nombre" required />
          <input className="card p-4" placeholder="Email" type="email" required />
          <input className="card p-4" placeholder="Fecha (si la tienes)" />
          <textarea className="card p-4 min-h-40" placeholder="Cuéntanos el tipo de evento y lo que esperas"></textarea>
          <button className="btn-primary w-fit">Enviar</button>
        </form>
        <p className="p mt-4">Si eres de acción rápida: <a href="https://wa.me/" target="_blank" rel="noopener">WhatsApp</a>.</p>
      </div>
    </section>
  );
}
