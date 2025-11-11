// app/servicios/fiestas/ClientShell.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Music,
  Sparkles,
  PartyPopper,
  Check,
  Star,
  ArrowRight,
  Users,
  MessageCircle,
  Flame,
  Heart,
  Cake,
  Gift,
  Zap,
  Clock,
  TrendingUp,
} from 'lucide-react';

// Analytics
let track: (event: string, data?: any) => void = () => {};
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  import('@vercel/analytics').then((mod) => {
    track = mod.track;
  });
}

const WA_LINK = `https://wa.me/34699121023?text=${encodeURIComponent(
  'Hola! Quiero info para mi fiesta privada'
)}`;

const fiestaPackages = [
  {
    id: 'cumple-basico',
    name: '🎂 Cumpleaños Básico',
    tagline: 'La fiesta que esperan',
    emotion: 'Tus amigos lo pasarán bien (pero sin el WOW factor)',
    price: '490€',
    priceOriginal: null,
    features: [
      '🎵 DJ profesional 4 horas',
      '🔊 Sonido EV 2.000W (claro y potente)',
      '💡 Luces LED básicas (8 focos dinámicos)',
      '🎤 Micrófono inalámbrico',
      '📱 Playlist personalizada pre-evento',
      '🚚 Montaje + desmontaje incluido',
    ],
    ideal: 'Hasta 80 personas',
    bestFor: 'Cumpleaños familiares, reuniones íntimas',
    cta: 'Reservar Cumpleaños',
    popular: false,
  },
  {
    id: 'despedida-premium',
    name: '🍾 Despedida Premium',
    tagline: 'La que recordarán siempre',
    emotion: 'La despedida que todos comentarán durante años',
    price: '790€',
    priceOriginal: '990€',
    discount: '-20%',
    features: [
      '✨ TODO lo Básico +',
      '🔊 Sonido mejorado 3.000W (máxima calidad)',
      '💡 Iluminación LED avanzada (16 focos profesionales)',
      '🌫️ Máquina de humo sincronizada',
      '🎆 Efectos especiales (confeti, CO2 frío)',
      '📸 Photocall con luces LED',
      '🎚️ DJ con experiencia lectura pista',
      '🎁 Momentos especiales personalizados',
    ],
    ideal: '80-120 personas',
    bestFor: 'Despedidas de soltero/a, reuniones especiales',
    highlight: true,
    cta: 'Quiero Esta Despedida',
    popular: true,
    badge: '🔥 MÁS RESERVADO',
  },
  {
    id: 'tematica-completa',
    name: '🎭 Fiesta Temática Completa',
    tagline: 'Tu imaginación hecha realidad',
    emotion: 'La fiesta que define tu personalidad y marca un antes/después',
    price: '990€',
    priceOriginal: null,
    features: [
      '🔥 TODO lo Premium +',
      '🎨 Tematización COMPLETA personalizada',
      '🎬 Decoración LED adaptada al tema',
      '🎵 Playlist temática 100% personalizada',
      '💫 Efectos especiales coordinados con tema',
      '⏱️ 6 horas DJ (vs 4h otros packs)',
      '🎪 Elementos decorativos temáticos',
      '📷 Zona fotográfica tematizada',
    ],
    ideal: '50-150 personas',
    bestFor: 'Halloween, años 80, Harry Potter, Stranger Things, cualquier tema',
    cta: 'Crear Mi Fiesta',
    popular: false,
  },
];

const themeExamples = [
  {
    theme: '🎃 Halloween Terror',
    description: 'Luces rojas/naranja, humo bajo constante, música terror + electrónica oscura',
    image: '/img/portfolio/fiestas-privadas/halloween.webp',
  },
  {
    theme: '🕺 Años 80 Neón',
    description: 'Luces neón sincronizadas, música 80s, decoración retro fluorescente',
    image: '/img/portfolio/fiestas-privadas/80s.webp',
  },
  {
    theme: '⚡ Harry Potter Mágico',
    description: 'Iluminación castillo, efectos mágicos, música épica, decoración Hogwarts',
    image: '/img/portfolio/fiestas-privadas/harry-potter.webp',
  },
  {
    theme: '🌴 Tropical Sunset',
    description: 'Luces cálidas degradadas, música tropical/reggaeton, ambiente veraniego',
    image: '/img/portfolio/fiestas-privadas/tropical.webp',
  },
];

const testimonials = [
  {
    name: 'Marc',
    age: 30,
    event: 'Cumpleaños 30',
    location: 'Barcelona',
    image: '/img/portfolio/fiestas-privadas/shot-01.webp',
    quote:
      'Contraté el pack Premium para mi 30 cumpleaños. La pista estuvo LLENA desde las 23h hasta las 5am. El DJ supo exactamente qué poner en cada momento. Mis amigos aún me preguntan dónde lo contraté.',
    rating: 5,
    pack: 'Premium',
    result: 'Pista llena hasta las 5am',
  },
  {
    name: 'Laura y Amigas',
    age: 28,
    event: 'Despedida Soltera',
    location: 'Lleida',
    image: '/img/portfolio/fiestas-privadas/shot-02.webp',
    quote:
      'Queríamos una despedida diferente. La tematización años 90 con karaoke profesional + efectos fue PERFECTA. Todas lloramos de la risa. La mejor despedida a la que he ido (y he ido a muchas).',
    rating: 5,
    pack: 'Temática',
    result: 'La mejor despedida según 15 invitadas',
  },
  {
    name: 'Carlos',
    age: 25,
    event: 'Fiesta Halloween',
    location: 'Girona',
    image: '/img/portfolio/fiestas-privadas/shot-03.webp',
    quote:
      'Organizamos fiesta Halloween con tema terror. Las luces rojas + humo bajo + música oscura crearon un ambiente BRUTAL. Mis amigos siguen hablando de la fiesta 8 meses después.',
    rating: 5,
    pack: 'Temática',
    result: 'Comentada 8 meses después',
  },
];

const whyNotPlaylist = [
  {
    wrong: '❌ Playlist de Spotify',
    problem: 'Pista vacía en 1 hora, gente aburrida mirando móvil',
    right: '✅ DJ que LEE la pista',
    solution: 'Adapta música en tiempo real. Si no bailan, cambia. Pista LLENA garantizada.',
  },
  {
    wrong: '❌ Luces fijas aburridas',
    problem: '"Estuvo bien... pero nada especial"',
    right: '✅ Luces sincronizadas',
    solution: 'Cada cambio de canción = cambio de ambiente. IMPACTO visual continuo.',
  },
  {
    wrong: '❌ Sin personalización',
    problem: 'Fiesta genérica que olvidan en 2 semanas',
    right: '✅ Momentos personalizados',
    solution: 'Entrada especial, cumpleaños, brindis con efectos. Fiesta ÚNICA.',
  },
];

export default function ClientShell() {
  const [selectedTheme, setSelectedTheme] = useState<number | null>(null);

  useEffect(() => {
    track('View_Fiestas_Privadas');
  }, []);

  return (
    <div className="min-h-screen bg-bg-main">
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-bg-main z-10" />
          <img
            src="/img/portfolio/fiestas-privadas/hero.webp"
            alt="Fiestas privadas con DJ y efectos"
            className="w-full h-full object-cover animate-slow-zoom"
          />
        </div>

        <div className="relative z-20 mx-auto max-w-6xl px-4 py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-oe-gold/20 border border-oe-gold px-4 py-2 mb-6 backdrop-blur-sm">
            <Flame className="w-4 h-4 text-oe-gold" />
            <span className="text-sm font-medium text-oe-gold">+167 fiestas privadas en Catalunya</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black text-white mb-6 leading-[1.05]">
            La Fiesta Privada
            <br />
            <span className="gradient-text breathe">Que Tus Amigos Recordarán</span>
          </h1>

          <p className="text-2xl sm:text-3xl text-text-muted max-w-4xl mb-8 leading-relaxed">
            No es solo poner música.
            <br />
            Es crear <span className="text-oe-gold font-bold">el momento que todos comentarán</span> durante
            meses (y te pedirán el contacto del DJ).
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-10 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-oe-gold" />
              <span className="text-white/80">DJ que lee la pista en tiempo real</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-oe-gold" />
              <span className="text-white/80">Tematización personalizada disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-oe-gold" />
              <span className="text-white/80">Efectos especiales sincronizados</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-oe-gold text-oe-gold" />
              ))}
              <span className="text-white/80 ml-2">4.9/5 · 167 fiestas</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#packs"
              className="oe-btn-gold text-lg px-8 py-5 inline-flex items-center justify-center gap-3"
              onClick={() => track('Hero_CTA_Ver_Packs')}
            >
              <Party className="w-6 h-6" />
              Ver Packs de Fiesta
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
              WhatsApp Directo
            </a>
          </div>
        </div>
      </section>

      {/* POR QUÉ NO PLAYLIST */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-main to-bg-surface">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-h2 text-center text-white mb-6">
            ¿Por Qué Tu Fiesta Necesita
            <br />
            <span className="text-oe-gold">Un DJ Profesional?</span>
          </h2>

          <p className="text-xl text-text-muted text-center max-w-3xl mx-auto mb-16">
            La diferencia entre poner una playlist de Spotify y contratar un DJ profesional que LEE la
            pista.
          </p>

          <div className="space-y-8">
            {whyNotPlaylist.map((point, idx) => (
              <div
                key={idx}
                className="grid md:grid-cols-2 gap-6 items-center oe-card p-8 rounded-3xl hover:border-oe-gold/50 transition-all"
              >
                {/* PROBLEMA */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white">{point.wrong}</h3>
                  <p className="text-red-400 italic">"{point.problem}"</p>
                </div>

                {/* SOLUCIÓN */}
                <div className="space-y-3 relative md:pl-6 md:border-l-2 md:border-oe-gold/30">
                  <div className="inline-flex items-center gap-2 bg-oe-gold/10 border border-oe-gold rounded-full px-4 py-2 mb-2">
                    <Sparkles className="w-4 h-4 text-oe-gold" />
                    <span className="text-oe-gold font-bold text-sm">CON ÒRBITA</span>
                  </div>
                  <h3 className="text-2xl font-bold text-oe-gold">{point.right}</h3>
                  <p className="text-white">{point.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKS */}
      <section id="packs" className="py-20 sm:py-32 bg-bg-surface">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-white mb-4">
              Packs de Fiesta
              <br />
              <span className="text-oe-gold">(Elige Tu Nivel de ÉPICO)</span>
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              Todos los packs incluyen DJ profesional, equipamiento de calidad y montaje/desmontaje. La
              diferencia está en el nivel de IMPACTO y personalización.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {fiestaPackages.map((pack, idx) => (
              <div
                key={idx}
                id={pack.id}
                className={`relative rounded-3xl p-8 transition-all duration-400 ${
                  pack.highlight
                    ? 'oe-card border-2 border-oe-gold scale-105 ring-2 ring-oe-gold/20 ring-offset-4 ring-offset-bg-surface'
                    : 'bg-bg-main border border-border hover:border-oe-gold/30 hover:scale-[1.02]'
                }`}
              >
                {pack.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-oe-gold via-yellow-500 to-oe-gold text-black px-5 py-2 rounded-full text-sm font-bold font-display shadow-lg animate-pulse">
                    {pack.badge}
                  </div>
                )}

                <h3 className="text-3xl font-display font-black text-white mb-2">{pack.name}</h3>
                <p className="text-sm font-medium text-oe-gold mb-3">{pack.tagline}</p>
                <p className="text-text-muted italic mb-6 leading-relaxed min-h-[3rem]">
                  "{pack.emotion}"
                </p>

                <div className="flex items-baseline gap-3 mb-2">
                  <div className="text-4xl font-display font-black text-white">{pack.price}</div>
                  {pack.priceOriginal && (
                    <>
                      <div className="text-xl text-text-muted line-through">{pack.priceOriginal}</div>
                      <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        {pack.discount}
                      </div>
                    </>
                  )}
                </div>

                <ul className="space-y-3 mb-6 min-h-[22rem]">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                      <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 mb-6">
                  <div className="p-3 rounded-xl bg-oe-gold/10 border border-oe-gold/20">
                    <p className="text-xs text-oe-gold font-medium">👥 {pack.ideal}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                    <p className="text-xs text-blue-400 font-medium">✨ {pack.bestFor}</p>
                  </div>
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
                  onClick={() => track('Click_Pack_Fiesta', { pack: pack.name, price: pack.price })}
                >
                  {pack.cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-text-muted mb-4">
              ¿No sabes qué pack elegir? Cuéntanos tu fiesta y te recomendamos el mejor.
            </p>
            <a
              href={`${WA_LINK}%20-%20Necesito%20ayuda%20eligiendo%20pack`}
              className="inline-flex items-center gap-2 text-oe-gold hover:underline"
              onClick={() => track('CTA_Ayuda_Pack_Fiesta')}
            >
              <MessageCircle className="w-5 h-5" />
              Hablar con un asesor (gratis)
            </a>
          </div>
        </div>
      </section>

      {/* TEMATIZACIÓN */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-surface to-bg-main">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-h2 text-center text-white mb-4">
            Fiestas Temáticas
            <br />
            <span className="text-oe-gold">Tu Imaginación Hecha Realidad</span>
          </h2>

          <p className="text-xl text-text-muted text-center max-w-3xl mx-auto mb-16">
            No ponemos solo música del tema. Creamos la EXPERIENCIA completa: luces adaptadas, efectos
            sincronizados, decoración LED y ambiente inmersivo.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {themeExamples.map((theme, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden bg-bg-surface border border-border hover:border-oe-gold/50 transition-all cursor-pointer"
                onClick={() => setSelectedTheme(idx === selectedTheme ? null : idx)}
              >
                <div className="aspect-square overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                  <img
                    src={theme.image}
                    alt={theme.theme}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-xl font-bold text-white mb-2">{theme.theme}</h3>
                    <p className="text-sm text-text-muted">{theme.description}</p>
                  </div>
                </div>

                <div className="p-4 border-t border-border">
                  <a
                    href={`${WA_LINK}%20-%20Quiero%20fiesta%20tema%20${encodeURIComponent(theme.theme)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-oe-gold hover:underline inline-flex items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      track('Click_Tema', { theme: theme.theme });
                    }}
                  >
                    Quiero este tema
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-white mb-4">
              ¿Tu tema no está aquí?{' '}
              <span className="text-oe-gold font-bold">Cualquier tema es posible.</span>
            </p>
            <p className="text-sm text-text-muted mb-6">
              Star Wars, Navidad, años 90, Ibiza sunset, neón futurista, terror zombie... Cuéntanos tu idea.
            </p>
            <a
              href={`${WA_LINK}%20-%20Tengo%20idea%20tema%20personalizado`}
              target="_blank"
              rel="noopener noreferrer"
              className="oe-btn-gold inline-flex items-center gap-2"
              onClick={() => track('CTA_Tema_Personalizado')}
            >
              <Gift className="w-5 h-5" />
              Crear Mi Tema Personalizado
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-20 sm:py-32 bg-bg-surface">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-h2 text-center text-white mb-4">
            Fiestas Reales,
            <br />
            <span className="text-oe-gold">Comentarios Reales</span>
          </h2>

          <p className="text-xl text-text-muted text-center max-w-3xl mx-auto mb-16">
            Lo que dicen las personas que ya contrataron Òrbita para sus fiestas privadas.
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="rounded-3xl overflow-hidden bg-bg-main border border-border hover:border-oe-gold/50 transition-all group"
              >
                <div className="aspect-video overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img
                    src={testimonial.image}
                    alt={`Fiesta ${testimonial.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 right-3 z-20 bg-oe-gold/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <p className="text-xs font-bold text-black">Pack {testimonial.pack}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-oe-gold text-oe-gold" />
                    ))}
                  </div>

                  <p className="text-white italic mb-4 leading-relaxed text-sm">"{testimonial.quote}"</p>

                  <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/30">
                    <p className="text-xs text-green-400 font-bold flex items-center gap-2">
                      <TrendingUp className="w-3 h-3" />
                      {testimonial.result}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-10 h-10 rounded-full bg-oe-gold/10 flex items-center justify-center flex-shrink-0">
                      {testimonial.event.includes('Cumpleaños') ? (
                        <Cake className="w-5 h-5 text-oe-gold" />
                      ) : (
                        <Party className="w-5 h-5 text-oe-gold" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">
                        {testimonial.name}
                        {testimonial.age && ` (${testimonial.age} años)`}
                      </p>
                      <p className="text-xs text-text-muted">
                        {testimonial.event} · {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-text-muted text-sm">
              ⭐ 4.9/5 valoración media · 167 fiestas · 92% repiten o recomiendan
            </p>
          </div>
        </div>
      </section>

      {/* GARANTÍA */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-surface to-bg-main">
        <div className="mx-auto max-w-4xl px-4">
          <div className="oe-card p-10 rounded-3xl text-center border-2 border-oe-gold/50">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-oe-gold/10 flex items-center justify-center">
              <Heart className="w-10 h-10 text-oe-gold" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-4">
              Garantía "Pista Llena o Reembolso"
            </h2>

            <p className="text-xl text-text-muted mb-8 leading-relaxed">
              Si tu pista no está llena la mayor parte de la fiesta,{' '}
              <span className="text-oe-gold font-bold">te devolvemos el 50% del dinero</span>. Así de
              seguros estamos de que nuestro DJ sabe mantener el ambiente.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 rounded-xl bg-bg-main">
                <TrendingUp className="w-8 h-8 text-oe-gold mx-auto mb-2" />
                <p className="text-sm text-white font-bold">94%</p>
                <p className="text-xs text-text-muted">Pista llena durante mas de 3 horas</p>
              </div>
              <div className="p-4 rounded-xl bg-bg-main">
                <Clock className="w-8 h-8 text-oe-gold mx-auto mb-2" />
                <p className="text-sm text-white font-bold">4.8 horas</p>
                <p className="text-xs text-text-muted">Duración media fiesta</p>
              </div>
              <div className="p-4 rounded-xl bg-bg-main">
                <Users className="w-8 h-8 text-oe-gold mx-auto mb-2" />
                <p className="text-sm text-white font-bold">92%</p>
                <p className="text-xs text-text-muted">Repiten o recomiendan</p>
              </div>
            </div>

            <p className="text-sm text-text-muted">
              * Garantía válida si se siguen recomendaciones básicas de espacio, horario y público
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 sm:py-32 bg-bg-main">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl sm:text-6xl font-display font-black text-white mb-6 leading-tight">
            ¿Listo Para Tu Fiesta
            <br />
            <span className="text-oe-gold">Épica?</span>
          </h2>

          <p className="text-xl text-text-muted mb-10 leading-relaxed">
            Solo <span className="text-oe-gold font-bold">6 fechas disponibles este mes</span>.
            <br />
            Los fines de semana se llenan 6-8 semanas antes. Reserva YA.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href={`${WA_LINK}%20-%20Quiero%20reservar%20mi%20fiesta`}
              target="_blank"
              rel="noopener noreferrer"
              className="oe-btn-gold text-xl px-10 py-6 inline-flex items-center justify-center gap-3"
              onClick={() => track('CTA_Final_Fiesta')}
            >
              <Party className="w-7 h-7" />
              Reservar Mi Fiesta
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>

          <p className="text-sm text-text-muted">
            ⚡ Respondemos en menos de 2h (incluso fines de semana)
            <br />
            💶 Señal 30% | Resto día evento
            <br />
            🎁 Reserva esta semana y te regalamos photocall LED gratis
          </p>
        </div>
      </section>

      {/* CTA STICKY MOBILE */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="oe-btn-gold w-full flex items-center justify-center gap-2 shadow-2xl animate-bounce"
          onClick={() => track('Sticky_WA_Fiesta')}
        >
          <MessageCircle className="w-5 h-5" />
          Reservar Mi Fiesta
        </a>
      </div>
    </div>
  );
}
