// app/servicios/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Music, 
  Heart, 
  Cake, 
  Briefcase, 
  Settings, 
  Package,
  ArrowRight,
  Star,
  Check
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Servicios | DJ + Luces + Efectos para Todo Tipo de Eventos',
  description:
    'Descubre todos nuestros servicios: bodas épicas, discomóvil profesional, fiestas privadas, eventos corporativos, producción técnica y alquiler de equipamiento. +300 eventos en Catalunya. 4.9/5⭐',
  keywords: [
    'servicios eventos',
    'dj bodas',
    'discomovil',
    'fiestas privadas',
    'eventos corporativos',
    'produccion tecnica',
    'alquiler equipamiento',
  ],
  openGraph: {
    title: 'Servicios Òrbita Events | Bodas, Fiestas, Corporativos y Más',
    description: 'DJ + Luces + Efectos para todo tipo de eventos en Catalunya. +300 eventos. 4.9/5⭐',
    url: '/servicios',
  },
};

const servicios = [
  {
    name: 'Bodas',
    icon: Heart,
    href: '/servicios/bodas',
    tagline: 'El día más importante merece el mejor ambiente',
    desc: 'Ceremonia emotiva, cóctel elegante y fiesta épica. Todo sincronizado para que tus invitados bailen hasta que cierres la barra.',
    features: ['DJ que lee la sala', 'Luces sincronizadas', 'Efectos especiales', 'Coordinación total'],
    color: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'border-pink-500/30',
    popular: true,
  },
  {
    name: 'Discomóvil',
    icon: Music,
    href: '/servicios/discomovil',
    tagline: 'La fiesta que tus amigos NO olvidarán',
    desc: 'No ponemos playlists. Leemos la pista en tiempo real. Resultado: pista LLENA desde las 23h hasta que se van.',
    features: ['Pista llena garantizada', 'Equipamiento profesional', 'Efectos WOW', 'Desde 690€'],
    color: 'from-purple-500/20 to-violet-500/20',
    borderColor: 'border-purple-500/30',
    popular: true,
  },
  {
    name: 'Fiestas Privadas',
    icon: Cake,
    href: '/servicios/fiestas',
    tagline: 'Cumpleaños, despedidas y temáticas únicas',
    desc: 'Desde cumpleaños épicos hasta despedidas memorables. Tematización completa disponible (Halloween, años 80, Harry Potter...).',
    features: ['Tematización personalizada', 'DJ + efectos', 'Playlist curada', 'Desde 490€'],
    color: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30',
    popular: false,
  },
  {
    name: 'Eventos Empresas',
    icon: Briefcase,
    href: '/servicios/empresas',
    tagline: 'El evento que te hace quedar como un crack',
    desc: 'Team building inmersivo, cenas de empresa épicas, presentaciones impactantes. Facturación + seguros + cero estrés.',
    features: ['Factura inmediata', 'Equipamiento profesional', 'Coordinador 24h', 'Desde 1.200€'],
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    popular: false,
  },
  {
    name: 'Producción Técnica',
    icon: Settings,
    href: '/servicios/produccion',
    tagline: 'Montaje, operación y gestión sin sustos',
    desc: 'Diseño técnico, montaje profesional, operación en directo. Para productoras y organizadores que necesitan cero problemas.',
    features: ['Equipo técnico completo', 'Operación in situ', 'Plan B garantizado', 'Consultar'],
    color: 'from-emerald-500/20 to-green-500/20',
    borderColor: 'border-emerald-500/30',
    popular: false,
  },
  {
    name: 'Alquiler',
    icon: Package,
    href: '/servicios/alquiler',
    tagline: 'Equipamiento profesional con o sin técnico',
    desc: 'EV ETX-15P, B-150 LED, Pioneer DJ. Alquila el equipo que usamos en nuestros eventos. Entrega incluida.',
    features: ['EV + Pioneer + B-150', 'Con/sin técnico', 'Backup garantizado', 'Desde 150€/día'],
    color: 'from-slate-500/20 to-gray-500/20',
    borderColor: 'border-slate-500/30',
    popular: false,
  },
] as const;

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-bg-main">
      {/* HERO */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg-surface to-bg-main" />
        
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-oe-gold/20 border border-oe-gold px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-oe-gold" />
            <span className="text-sm font-medium text-oe-gold">
              +300 eventos · 4.9/5⭐ · Catalunya completa
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-display font-black text-white mb-6 leading-[1.1]">
            Nuestros Servicios
            <br />
            <span className="gradient-text breathe">Para Tu Evento Épico</span>
          </h1>

          <p className="text-xl sm:text-2xl text-text-muted max-w-3xl mx-auto mb-8">
            DJ profesional + luces sincronizadas + efectos especiales.
            <br />
            <span className="text-oe-gold font-bold">
              Elige tu tipo de evento y descubre cómo lo hacemos memorable.
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-oe-gold" />
              <span className="text-white/80">Equipamiento profesional</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-oe-gold" />
              <span className="text-white/80">Backup completo</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-oe-gold" />
              <span className="text-white/80">Pista llena garantizada</span>
            </div>
          </div>
        </div>
      </section>

      {/* GRID SERVICIOS */}
      <section className="py-20 bg-gradient-to-b from-bg-main to-bg-surface">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicios.map((servicio, idx) => {
              const Icon = servicio.icon;
              return (
                <Link
                  key={servicio.href}
                  href={servicio.href}
                  className={`group relative rounded-3xl p-8 transition-all duration-400 bg-bg-surface border ${servicio.borderColor} hover:border-oe-gold/50 hover:-translate-y-2 hover:shadow-2xl ${
                    servicio.popular ? 'ring-2 ring-oe-gold/20 ring-offset-2 ring-offset-bg-main' : ''
                  }`}
                >
                  {servicio.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-oe-gold to-[#b9994b] text-black px-4 py-1.5 rounded-full text-xs font-bold">
                        ⭐ MÁS POPULAR
                      </span>
                    </div>
                  )}

                  {/* Icon con gradiente de fondo */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${servicio.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8 text-oe-gold" />
                  </div>

                  <h2 className="text-2xl font-display font-black text-white mb-2 group-hover:text-oe-gold transition-colors">
                    {servicio.name}
                  </h2>

                  <p className="text-sm font-medium text-oe-gold mb-3">{servicio.tagline}</p>

                  <p className="text-text-muted mb-6 leading-relaxed">{servicio.desc}</p>

                  <ul className="space-y-2 mb-6">
                    {servicio.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-white/80">
                        <Check className="w-4 h-4 text-oe-gold flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-oe-gold font-bold group-hover:gap-4 transition-all">
                    Ver servicio
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 sm:py-32 bg-bg-surface">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-6">
            ¿No Sabes Qué Servicio Necesitas?
          </h2>
          <p className="text-xl text-text-muted mb-10">
            Cuéntanos tu evento y te recomendamos la mejor opción.
            <br />
            <span className="text-oe-gold font-bold">Respondemos en menos de 2 horas.</span>
          </p>

          <a
            href="https://wa.me/34699121023?text=Hola,%20necesito%20ayuda%20eligiendo%20servicio%20para%20mi%20evento"
            target="_blank"
            rel="noopener noreferrer"
            className="oe-btn-gold text-xl px-10 py-6 inline-flex items-center gap-3"
          >
            <Music className="w-7 h-7" />
            Hablar con un Asesor (Gratis)
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>
      </section>
    </div>
  );
}
