// app/components/ui/footer.tsx
import Link from "next/link";
import { Phone, Mail, MapPin, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface/50 backdrop-blur-xl border-t border-white/10 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-black font-display gradient-text mb-4">Òrbita Events</h3>
            <p className="text-white/70">Sonido que emociona. Luz que enamora.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-3">Servicios</h4>
            <ul className="space-y-2 text-white/70">
              <li><Link href="/servicios/bodas" className="hover:text-white transition">Bodas Premium</Link></li>
              <li><Link href="/servicios/discomobil" className="hover:text-white transition">Discomóvil</Link></li>
              <li><Link href="/servicios/empresas" className="hover:text-white transition">Eventos Empresas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">Contacto</h4>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+34699121023">699 121 023</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@orbitaevents.com">info@orbitaevents.com</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Barcelona, Catalunya
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">¡Reserva YA!</h4>
            <p className="text-white/70 mb-4">20% OFF en tu primer evento</p>
            <Link href="/contacto" className="oe-btn-gold w-full text-center block">
              <Sparkles className="w-5 h-5 inline mr-2" />
              Presupuesto Gratis
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm">
          © 2025 Òrbita Events. Todos los derechos reservados. 
          <Link href="/legal" className="underline ml-2">Aviso Legal</Link>
        </div>
      </div>
    </footer>
  );
}
