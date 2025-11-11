// app/servicios/empresas/ClientShell.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Briefcase,
  Users,
  Presentation,
  PartyPopper,
  Check,
  Star,
  ArrowRight,
  Shield,
  Zap,
  MessageCircle,
  TrendingUp,
  Award,
  Clock,
  Building2,
  Sparkles,
} from 'lucide-react';

// Analytics
let track: (event: string, data?: any) => void = () => {};
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  import('@vercel/analytics').then((mod) => {
    track = mod.track;
  });
}

const WA_LINK = `https://wa.me/34699121023?text=${encodeURIComponent(
  'Hola, quiero información sobre eventos corporativos'
)}`;

const corporatePackages = [
  {
    id: 'team-building',
    name: '🎯 Team Building Inmersivo',
    tagline: 'El que fortalece tu equipo DE VERDAD',
    emotion: 'Tu equipo hablará de esto durante 6 meses (y mejorará la productividad)',
    price: '1.800€',
    priceDetail: 'Hasta 50 personas',
    features: [
      '✅ Tematización completa (Harry Potter, Stranger Things, etc)',
      '✅ Escape room corporativo con actores',
      '✅ Ambientación sonora inmersiva',
      '✅ Efectos especiales (humo, luces dinámicas)',
      '✅ DJ ambiente + música temática',
      '✅ Coordinador dedicado todo el evento',
    ],
    results: '📈 85% de empresas repiten al año siguiente',
    ideal: 'Equipos 20-50 personas',
    cta: 'Ver Tematizaciones',
  },
  {
    id: 'cenas-empresa',
    name: '🍾 Cenas de Empresa Premium',
    tagline: 'La que hace que nadie se vaya a las 23h',
    emotion:
      'El evento que hace que tu equipo sienta que trabaja en una empresa TOP (no en una empresa más)',
    price: '2.000€',
    priceDetail: 'Hasta 120 personas',
    features: [
      '✅ Luces arquitecturales profesionales',
      '✅ Música curada para networking + fiesta',
      '✅ Efectos sincronizados (humo bajo, confeti final)',
      '✅ Branding con logo empresa proyectado',
      '✅ Karaoke profesional (opcional)',
      '✅ Videomapping con logros empresa',
    ],
    results: '⏰ Gente se queda hasta las 2am (no se van a las 23h)',
    ideal: '50-150 personas',
    highlight: true,
    cta: 'Quiero Esta Cena',
  },
  {
    id: 'presentaciones',
    name: '📊 Presentaciones Impactantes',
    tagline: 'Presenta como Apple presenta el iPhone',
    emotion: 'Tu producto/servicio presentado con el impacto que MERECE (no con un proyector cutre)',
    price: '1.200€',
    priceDetail: 'Evento medio día',
    features: [
      '✅ Sonido conferencia profesional',
      '✅ Sincronización música + luces con presentación',
      '✅ Impacto audiovisual que mantiene atención',
      '✅ Micrófono inalámbrico diadema',
      '✅ Ambiente previo/posterior networking',
      '✅ Técnico dedicado durante presentación',
    ],
    results: '💬 "La mejor presentación que hemos visto"',
    ideal: 'Lanzamientos, conferencias, formaciones',
    cta: 'Consultar Fecha',
  },
  {
    id: 'celebraciones',
    name: '🎊 Celebraciones de Logros',
    tagline: 'Bonus, aniversarios, hitos',
    emotion:
      'Celebra los éxitos de tu equipo como se merecen (no con una comida estándar en un restaurante)',
    price: '2.500€',
    priceDetail: 'Evento completo',
    features: [
      '✅ Personalización total con colores corporativos',
      '✅ Videomapping con datos (facturación, logros, equipo)',
      '✅ Show de luces + efectos especiales',
      '✅ DJ profesional adaptado a ambiente',
      '✅ Entrega premios con efectos (confeti, CO2)',
      '✅ Foto/vídeo del evento (opcional)',
    ],
    results: '🏆 Tu equipo se siente valorado y motivado',
    ideal: 'Aniversarios, objetivos cumplidos, bonus',
    cta: 'Planificar Celebración',
  },
];

const painPoints = [
  {
    wrong: '❌ DJ sin experiencia corporativa',
    consequence: 'Tu equipo aburrido mirando el móvil a las 23h',
    right: '✅ DJ especializado',
    benefit: 'Lee el ambiente corporativo y adapta música/ritmo en tiempo real',
  },
  {
    wrong: '❌ Sonido/luces cutres',
    consequence: 'Parece fiesta de garaje, no evento de empresa profesional',
    right: '✅ Equipamiento nivel concierto',
    benefit: 'Pioneer + EV profesional. Tu empresa luce como lo que es: TOP',
  },
  {
    wrong: '❌ Proveedores sin profesionalidad',
    consequence: 'Retrasos, estrés, factura mal, problemas técnicos sin solución',
    right: '✅ Facturación + seguros + backup',
    benefit: 'Factura inmediata, seguro 600k€, plan B para todo, 0 estrés',
  },
];

const testimonials = [
  {
    company: 'Empresa Tecnología',
    event: 'Cena Navidad 120 personas',
    person: 'Director RRHH',
    location: 'Barcelona',
    image: '/img/portfolio/empresas/corporate-01.webp',
    quote:
      'Contraté Òrbita para la cena de Navidad. El equipo TODAVÍA habla del evento 4 meses después. La tematización años 80 + karaoke profesional + efectos láser sincronizados fue brutal. Nadie se fue antes de las 2am.',
    result: 'Nos han contratado para los próximos 3 años',
    rating: 5,
  },
  {
    company: 'Consultora Internacional',
    event: 'Team Building 45 personas',
    person: 'CEO',
    location: 'Lleida',
    image: '/img/portfolio/empresas/corporate-02.webp',
    quote:
      'Necesitaba algo diferente para fortalecer el equipo. El escape room Harry Potter con ambientación completa fue PERFECTO. El equipo salió motivadísimo y la conexión entre ellos mejoró notablemente.',
    result: 'Productividad +20% en el siguiente trimestre',
    rating: 5,
  },
];

const guarantees = [
  {
    icon: Shield,
    title: 'Seguro RC 600.000€',
    description: 'Cobertura total responsabilidad civil',
  },
  {
    icon: Clock,
    title: 'Montaje sin interferir',
    description: 'Montaje/desmontaje fuera de horario laboral',
  },
  {
    icon: Zap,
    title: 'Plan B garantizado',
    description: 'Backup de equipamiento + técnico on-site',
  },
  {
    icon: Award,
    title: 'Coordinador 24h',
    description: 'Disponible todo el día del evento',
  },
];

export default function ClientShell() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  useEffect(() => {
    track('View_Eventos_Corporativos');
  }, []);

  return (
    <div className="min-h-screen bg-bg-main">
      {/* HERO CORPORATIVO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-bg-main z-10" />
          <img
            src="/img/portfolio/empresas/corporate-hero.webp"
            alt="Eventos corporativos profesionales"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 mx-auto max-w-6xl px-4 py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-oe-gold/20 border border-oe-gold px-4 py-2 mb-6 backdrop-blur-sm">
            <Building2 className="w-4 h-4 text-oe-gold" />
            <span className="text-sm font-medium text-oe-gold">Eventos corporativos profesionales</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black text-white mb-6 leading-[1.05]">
            El Evento Corporativo
            <br />
            <span className="gradient-text breathe">Que Te Hace Quedar Como un Crack</span>
          </h1>

          <p className="text-2xl sm:text-3xl text-text-muted max-w-4xl mb-8 leading-relaxed">
            No es un evento más de empresa.
            <br />
            Es el evento que{' '}
            <span className="text-oe-gold font-bold">tu equipo recordará durante meses</span> y hará que
            quieran seguir trabajando contigo.
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-10 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-oe-gold" />
              <span className="text-white/80">Factura + IVA inmediato</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-oe-gold" />
              <span className="text-white/80">Seguro RC 600.000€</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-oe-gold" />
              <span className="text-white/80">Equipamiento profesional Pioneer</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-oe-gold text-oe-gold" />
              ))}
              <span className="text-white/80 ml-2">4.9/5 · 47 empresas</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#packs"
              className="oe-btn-gold text-lg px-8 py-5 inline-flex items-center justify-center gap-3"
              onClick={() => track('Hero_CTA_Ver_Packs')}
            >
              <Briefcase className="w-6 h-6" />
              Ver Servicios Corporativos
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="oe-btn text-lg px-8 py-5 inline-flex items-center justify-center gap-3 bg-bg-surface border border-oe-gold/30 hover:border-oe-gold hover:bg-oe-gold/10"
              onClick={() => track('Hero_CTA_WhatsApp')}
            >
              <MessageCircle className="w-6 h-6" />
              Consulta Personalizada
            </a>
          </div>
        </div>
      </section>

      {/* POR QUÉ FRACASAN LOS EVENTOS CORPORATIVOS */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-main to-bg-surface">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-h2 text-center text-white mb-6">
            ¿Por Qué Fracasan los
            <br />
            <span className="text-oe-gold">Eventos Corporativos?</span>
          </h2>

          <p className="text-xl text-text-muted text-center max-w-3xl mx-auto mb-16">
            Tu equipo se aburre, se van temprano, y al día siguiente nadie habla del evento. Esto pasa
            cuando contratas proveedores sin experiencia corporativa real.
          </p>

          <div className="space-y-8">
            {painPoints.map((point, idx) => (
              <div
                key={idx}
                className="grid md:grid-cols-2 gap-6 items-center oe-card p-8 rounded-3xl"
              >
                {/* PROBLEMA */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2">
                    <span className="text-red-500 font-bold text-sm">PROBLEMA COMÚN</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{point.wrong}</h3>
                  <p className="text-text-muted italic">"{point.consequence}"</p>
                </div>

                {/* SOLUCIÓN */}
                <div className="space-y-3 relative md:pl-6 md:border-l-2 md:border-oe-gold/30">
                  <div className="inline-flex items-center gap-2 bg-oe-gold/10 border border-oe-gold rounded-full px-4 py-2">
                    <Sparkles className="w-4 h-4 text-oe-gold" />
                    <span className="text-oe-gold font-bold text-sm">CON ÒRBITA</span>
                  </div>
                  <h3 className="text-2xl font-bold text-oe-gold">{point.right}</h3>
                  <p className="text-white">{point.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS CORPORATIVOS */}
      <section id="packs" className="py-20 sm:py-32 bg-bg-surface">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-white mb-4">
              Servicios Corporativos
              <br />
              <span className="text-oe-gold">(Tu Equipo Te Lo Agradecerá)</span>
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              Cada servicio diseñado para un objetivo: que tu evento corporativo sea memorable, profesional
              y fortalezca tu equipo.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {corporatePackages.map((pack, idx) => (
              <div
                key={idx}
                id={pack.id}
                className={`relative rounded-3xl p-8 transition-all duration-400 ${
                  pack.highlight
                    ? 'oe-card border-2 border-oe-gold ring-2 ring-oe-gold/20 ring-offset-4 ring-offset-bg-surface'
                    : 'bg-bg-main border border-border hover:border-oe-gold/30'
                }`}
              >
                {pack.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-oe-gold to-[#b9994b] text-black px-5 py-2 rounded-full text-sm font-bold font-display shadow-lg">
                    ⭐ MÁS CONTRATADO
                  </div>
                )}

                <h3 className="text-3xl font-display font-black text-white mb-2">{pack.name}</h3>
                <p className="text-sm font-medium text-oe-gold mb-3">{pack.tagline}</p>
                <p className="text-text-muted italic mb-6 leading-relaxed">"{pack.emotion}"</p>

                <div className="flex items-baseline gap-2 mb-2">
                  <div className="text-4xl font-display font-black text-white">{pack.price}</div>
                  <div className="text-sm text-text-muted">{pack.priceDetail}</div>
                </div>

                <div className="mb-6 p-3 rounded-xl bg-green-500/10 border border-green-500/30">
                  <p className="text-sm text-green-400 font-medium">{pack.results}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                      <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-6 p-3 rounded-xl bg-oe-gold/10 border border-oe-gold/20">
                  <p className="text-xs text-oe-gold font-medium">💼 {pack.ideal}</p>
                </div>

                <a
                  href={`${WA_LINK}%20-%20${encodeURIComponent(pack.name)}`}
                  className={`group inline-flex items-center justify-center gap-2 w-full rounded-xl px-6 py-4 font-bold font-display transition-all ${
                    pack.highlight
                      ? 'oe-btn-gold'
                      : 'bg-bg-surface border border-oe-gold/30 text-white hover:border-oe-gold hover:bg-oe-gold/10'
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track('Click_Pack_Corporativo', { pack: pack.name, price: pack.price })
                  }
                >
                  {pack.cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GARANTÍAS CORPORATIVAS */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-surface to-bg-main">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-h2 text-center text-white mb-4">
            Garantías Profesionales
            <br />
            <span className="text-oe-gold">(Cero Estrés, Solo Resultados)</span>
          </h2>

          <p className="text-xl text-text-muted text-center max-w-3xl mx-auto mb-16">
            Trabajamos con empresas. Sabemos lo que necesitas: profesionalidad, facturación correcta y cero
            sorpresas.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, idx) => {
              const Icon = guarantee.icon;
              return (
                <div
                  key={idx}
                  className="oe-card p-6 rounded-2xl text-center hover:border-oe-gold/50 transition-all"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-oe-gold/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-oe-gold" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{guarantee.title}</h3>
                  <p className="text-sm text-text-muted">{guarantee.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 oe-card p-8 rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              Otras Garantías Incluidas
            </h3>
            <ul className="grid md:grid-cols-2 gap-4">
              <li className="flex items-start gap-3 text-white">
                <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                <span>Factura digital inmediata con IVA desglosado</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                <span>Contrato digital con condiciones claras</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                <span>Visita previa al espacio sin coste</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                <span>Coordinación con otros proveedores</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                <span>Cancelación flexible hasta 15 días antes (80% reembolso)</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                <span>WhatsApp directo coordinador el día del evento</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CASOS DE ÉXITO */}
      <section className="py-20 sm:py-32 bg-bg-surface">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-h2 text-center text-white mb-4">
            Empresas Reales,
            <br />
            <span className="text-oe-gold">Resultados Reales</span>
          </h2>

          <p className="text-xl text-text-muted text-center max-w-3xl mx-auto mb-16">
            Lo que dicen los responsables de RRHH y CEOs que han contratado nuestros eventos corporativos.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="rounded-3xl overflow-hidden bg-bg-main border border-border hover:border-oe-gold/50 transition-all"
              >
                <div className="aspect-video overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.company} - ${testimonial.event}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-oe-gold text-oe-gold" />
                    ))}
                  </div>

                  <p className="text-white text-lg italic mb-4 leading-relaxed">"{testimonial.quote}"</p>

                  <div className="mb-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                    <p className="text-sm text-green-400 font-bold flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      RESULTADO: {testimonial.result}
                    </p>
                  </div>

                  <div className="flex items-start gap-3 pt-4 border-t border-border">
                    <div className="w-12 h-12 rounded-full bg-oe-gold/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-oe-gold" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{testimonial.company}</p>
                      <p className="text-sm text-text-muted">
                        {testimonial.person} · {testimonial.event}
                      </p>
                      <p className="text-xs text-text-muted mt-1">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULADORA CORPORATIVA */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-surface to-bg-main">
        <div className="mx-auto max-w-4xl px-4">
          <div className="oe-card p-10 rounded-3xl text-center">
            <h2 className="text-4xl font-display font-black text-white mb-4">
              ¿Cuánto Cuesta Tu Evento Corporativo?
            </h2>
            <p className="text-xl text-text-muted mb-8">
              Cada empresa es diferente. Cuéntanos qué necesitas y te enviamos propuesta personalizada en
              menos de 24h.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
              <div className="flex items-start gap-3 text-white">
                <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                <span>Propuesta adaptada a tu presupuesto</span>
              </div>
              <div className="flex items-start gap-3 text-white">
                <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                <span>Sin compromiso de contratación</span>
              </div>
              <div className="flex items-start gap-3 text-white">
                <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                <span>Respuesta en menos de 24h</span>
              </div>
              <div className="flex items-start gap-3 text-white">
                <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                <span>Consultoría inicial gratuita</span>
              </div>
            </div>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="oe-btn-gold text-xl px-10 py-6 inline-flex items-center gap-3"
              onClick={() => track('CTA_Propuesta_Personalizada')}
            >
              <MessageCircle className="w-7 h-7" />
              Quiero Mi Propuesta Personalizada
              <ArrowRight className="w-6 h-6" />
            </a>

            <p className="text-sm text-text-muted mt-6">
              ⚡ Respondemos en menos de 2h (incluso fines de semana)
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 sm:py-32 bg-bg-main">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl sm:text-6xl font-display font-black text-white mb-6 leading-tight">
            ¿Listo Para el Evento Corporativo
            <br />
            <span className="text-oe-gold">Que Tu Equipo NO Olvidará?</span>
          </h2>

          <p className="text-xl text-text-muted mb-10 leading-relaxed">
            Solo 3 fechas corporativas disponibles en diciembre.
            <br />
            <span className="text-oe-gold font-bold">Las empresas reservan con 4 semanas de antelación.</span>
          </p>

          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="oe-btn-gold text-xl px-10 py-6 inline-flex items-center gap-3"
            onClick={() => track('CTA_Final_Corporativo')}
          >
            <Briefcase className="w-7 h-7" />
            Consultar Disponibilidad
            <ArrowRight className="w-6 h-6" />
          </a>

          <p className="text-sm text-text-muted mt-8">
            📧 O escríbenos a <a href="mailto:info@orbitaevents.cat" className="text-oe-gold hover:underline">info@orbitaevents.cat</a>
          </p>
        </div>
      </section>

      {/* CTA STICKY MOBILE */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="oe-btn-gold w-full flex items-center justify-center gap-2 shadow-2xl"
          onClick={() => track('Sticky_WA_Corporativo')}
        >
          <MessageCircle className="w-5 h-5" />
          Consulta Personalizada
        </a>
      </div>
    </div>
  );
}
