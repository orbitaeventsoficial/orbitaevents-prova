import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5">
      <div className="container py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <p className="font-semibold">Òrbita Events</p>
          <p className="p mt-2">Eventos reales, hechos con las manos, la cabeza y el alma.</p>
        </div>
        <div>
          <p className="font-semibold">Páginas</p>
          <ul className="mt-2 space-y-1">
            <li><Link href="/bodas">Bodas</Link></li>
            <li><Link href="/fiestas-tematicas">Fiestas temáticas</Link></li>
            <li><Link href="/empresas">Empresas</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Enlaces</p>
          <ul className="mt-2 space-y-1">
            <li><Link href="/contacto">Contacto</Link></li>
            <li><Link href="/sobre-nosotros">Sobre nosotros</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-oe-gray pb-8">© {new Date().getFullYear()} Òrbita Events</div>
    </footer>
  );
}
