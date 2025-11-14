// app/components/ui/footer.tsx
import Link from "next/link";
import { Phone, Mail, MapPin, Calculator } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-bg-surface/50 backdrop-blur-xl border-t border-white/10 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* COLUMNA 1: LOGO */}
          <div>
            <h3 className="text-2xl font-black font-display gradient-text mb-4">Òrbita Events</h3>
            <p className="text-white/70 mb-4">DJ profesional, sonido, luces y efectos para eventos inolvidables.</p>
            <p className="text-white/60 text-sm">Barcelona, Lleida, Girona, Tarragona</p>
          </div>
          
          {/* COLUMNA 2: SERVICIOS */}
          <div>
            <h4 className="font-bold text-white mb-4">Servicios</h4>
            <ul className="space-y-2 text-white/70">
              <li><Link href="/servicios/bodas" className="hover:text-oe-gold transition">DJ Bodas</Link></li>
              <li><Link href="/servicios/fiestas" className="hover:text-oe-gold transition">Fiestas Privadas</Link></li>
              <li><Link href="/servicios/discomobil" className="hover:text-oe-gold transition">Discomóvil</Link></li>
              <li><Link href="/servicios/empresas" className="hover:text-oe-gold transition">Eventos Empresas</Link></li>
              <li><Link href="/servicios/produccion" className="hover:text-oe-gold transition">Producción Técnica</Link></li>
              <li><Link href="/servicios/alquiler" className="hover:text-oe-gold transition">Alquiler Equipos</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: CONTACTO */}
          <div>
            <h4 className="font-bold text-white mb-4">Contacto</h4>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-oe-gold" />
                <a href="tel:+34699121023" className="hover:text-oe-gold transition">699 121 023</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-oe-gold" />
                <a href="mailto:info@orbitaevents.cat" className="hover:text-oe-gold transition">info@orbitaevents.cat</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-oe-gold" />
                <span>Lleida, Catalunya</span>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: CTA */}
          <div>
            <h4 className="font-bold text-white mb-4">Calcula tu presupuesto</h4>
            <p className="text-white/70 mb-4">Usa nuestro configurador para ver precios al instante</p>
            <Link href="/configurador" className="oe-btn-gold w-full text-center block mb-3">
              <Calculator className="w-5 h-5 inline mr-2" />
              Configurador
            </Link>
            <Link href="/contacto" className="oe-btn-outline w-full text-center block">
              Contactar
            </Link>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
          <p>© 2025 Òrbita Events. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/faq" className="hover:text-oe-gold transition">FAQ</Link>
            <Link href="/opiniones" className="hover:text-oe-gold transition">Opiniones</Link>
            <Link href="/portfolio" className="hover:text-oe-gold transition">Portfolio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
