'use client';

import { Heart, Music, Sparkles, Check, Star, Calendar, ArrowRight, Shield } from 'lucide-react';
import { useState } from 'react';

const weddingPackages = [
  {
    name: '💕 Boda Esencial',
    tagline: 'Lo importante, sin florituras',
    emotion: 'Música perfecta + ambiente mágico',
    price: '1.290€',
    features: [
      '🎵 DJ profesional 6h',
      '🔊 Sonido EV 3.000W cristalino',
      '💡 Iluminación LED ambiente (12 focos)',
      '🎤 Micrófono inalámbrico ceremonia',
      '🎧 Playlist personalizada',
    ],
    ideal: 'Bodas íntimas 80-120 invitados',
    cta: 'Pedir presupuesto',
  },
  {
    name: '💍 Boda Premium',
    tagline: 'La que todos recordarán',
    emotion: 'Tu entrada con humo + luces sincronizadas... lágrimas garantizadas',
    price: '1.890€',
    features: [
      '✨ Todo lo de Esencial +',
      '🌫️ Máquina humo baja profesional',
      '🎆 Efectos especiales (CO2, confeti)',
      '💡 Iluminación avanzada (20+ focos LED)',
      '🎬 Coordinación con fotógrafo/vídeo',
      '👔 Técnico dedicado TODO el evento',
    ],
    ideal: 'Bodas 120-200 invitados',
    highlight: true,
    cta: 'Quiero esta boda',
  },
  {
    name: '👑 Boda Luxury',
    tagline: 'Nivel Awwwards para tu boda',
    emotion: 'Producción digna de celebrity. Tu boda será trending topic.',
    price: 'desde 2.890€',
    features: [
      '🔥 Todo lo de Premium +',
      '🎪 Truss + pantalla LED gigante',
      '🎨 Diseño visual personalizado',
      '🎭 Shows sorpresa coordinados',
      '📸 Photocall con iluminación pro',
      '🎼 DJ + Saxofonista/Percusionista',
      '⚡ Efectos pirotécnicos (fríos)',
    ],
    ideal: 'Bodas 200+ invitados · Masías · Venues premium',
    cta: 'Hablar con experto',
  },
];

const realWeddings = [
  {
    couple: 'Laura & Marc',
    date: 'Junio 2024',
    location: 'Mas Terrats, Lleida',
    image: '/img/portfolio/bodas/shot-01.webp',
    quote: 'La entrada con el humo y las luces... mi madre lloró. Fue PERFECTO.',
    rating: 5,
  },
  {
    couple: 'Clara & David',
    date: 'Septiembre 2024',
    location: 'Hotel AC, Barcelona',
    image: '/img/portfolio/bodas/shot-02.webp',
    quote: 'Nuestros invitados AÚN nos preguntan quién hizo la música y las luces.',
    rating: 5,
  },
  {
    couple: 'Anna & Jordi',
    date: 'Octubre 2024',
    location: 'Can Ribas, Girona',
    image: '/img/portfolio/bodas/shot-03.webp',
    quote: 'Profesionales 100%. Llegaron antes, montaron rápido y el resultado... WOW.',
    rating: 5,
  },
];

export default function BodasClient() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-bg-main">
      {/* HERO EMOCIONAL */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Video/Imagen de fondo */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80 z-10" />
          <img
            src="/img/portfolio/bodas-cover.webp"
            alt="Boda Órbita Events"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 mx-auto max-w-5xl px-4 py-20 text-center">
          {/* Badge urgencia */}
          <div className="inline-flex items-center gap-2 rounded-full bg-oe-gold/20 border border-oe-gold px-4 py-2 mb-6 backdrop-blur-sm">
            <Calendar className="w-4 h-4 text-oe-gold" />
            <span className="text-sm font-medium text-oe-gold">
              Solo 4 sábados disponibles en Diciembre
            </span>
          </div>

          {/* Headline brutal */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black text-white mb-6 leading-[1.1]">
            El Momento Que Tu Suegra
            <br />
            <span className="gradient-text breathe">Recordará 20 Años</span>
          </h1>

          <p className="text-2xl sm:text-3xl text-text-muted max-w-3xl mx-auto mb-8 leading-relaxed">
            No es solo música y luces.
            <br />
            Es hacer que{' '}
            <span className="text-oe-gold font-bold">tu entrada deje sin palabras</span> a 150 personas.
          </p>

          {/* Stats rápidos */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-oe-gold text-oe-gold" />
              ))}
              <span className="text-white/80">4.9/5 · 87 bodas</span>
            </div>
            <span className="text-white/30">•</span>
            <span className="text-white/80">Barcelona · Lleida · Girona · Tarragona</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/34699121023?text=Hola!%20Quiero%20info%20para%20mi%20boda"
              className="oe-btn-gold text-lg px-8 py-5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Heart className="w-6 h-6" />
              Ver Packs de Boda
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="#packs"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-oe-gold/30 bg-bg-main/50 px-6 py-4 font-bold font-display text-white hover:border-oe-gold hover:bg-oe-gold/10 transition-all backdrop-blur-sm"
            >
              Ver casos reales
            </a>
          </div>

          {/* Garantía */}
          <p className="mt-8 text-white/60 text-sm">
            💯 Garantía total: Si no es tu mejor día, te devolvemos el 100%
          </p>
        </div>
      </section>

      {/* TRANSFORMACIÓN ANTES/DESPUÉS */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-main to-bg-surface">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-h2 text-center text-white mb-16">
            La Diferencia Entre{' '}
            <span className="line-through text-white/30">"Estuvo bien"</span>
            <br />y <span className="text-oe-gold">"FUE ÉPICO"</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* SIN Órbita */}
            <div className="relative rounded-3xl border-2 border-red-500/30 bg-red-500/5 p-8">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                ❌ Sin Órbita
              </div>
              <ul className="space-y-4 mt-4">
                <li className="flex items-start gap-3 text-white/60">
                  <span className="text-red-500 text-xl">✗</span>
                  <span>Altavoces de alquiler genéricos que suenan "normalitos"</span>
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <span className="text-red-500 text-xl">✗</span>
                  <span>DJ que no lee el ambiente (baile vacío a las 00:00)</span>
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <span className="text-red-500 text-xl">✗</span>
                  <span>Luces estáticas que no aportan nada</span>
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <span className="text-red-500 text-xl">✗</span>
                  <span>"Fue bonito pero... le faltó algo especial"</span>
                </li>
              </ul>
            </div>

            {/* CON Órbita */}
            <div className="relative rounded-3xl border-2 border-oe-gold bg-oe-gold/5 p-8 shadow-oe-glow">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-oe-gold text-black px-4 py-1 rounded-full text-sm font-bold">
                ✅ Con Órbita
              </div>
              <ul className="space-y-4 mt-4">
                <li className="flex items-start gap-3 text-white">
                  <Check className="w-6 h-6 text-oe-gold flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-oe-gold">Sonido EV 4.000W</strong> que hace vibrar el
                    pecho (sin saturar)
                  </span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <Check className="w-6 h-6 text-oe-gold flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-oe-gold">DJ experto</strong> que lee la pista y mantiene
                    el baile LLENO hasta el final
                  </span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <Check className="w-6 h-6 text-oe-gold flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-oe-gold">Efectos de humo + luces sincronizadas</strong>{' '}
                    en tu entrada (lágrimas 100% garantizadas)
                  </span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <Check className="w-6 h-6 text-oe-gold flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-oe-gold">"Fue LA MEJOR BODA"</strong> - tus invitados lo
                    repetirán durante meses
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PACKS BODAS */}
      <section id="packs" className="py-20 sm:py-32 bg-bg-surface">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-white mb-4">
              Elige Tu Pack
              <br />
              <span className="text-oe-gold">(Todos Incluyen Emoción Garantizada)</span>
            </h2>
            <p className="text-xl text-text-muted">
              Desde bodas íntimas hasta producciones de lujo
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {weddingPackages.map((pack, idx) => (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 transition-all duration-400 ${
                  pack.highlight
                    ? 'oe-card border-2 border-oe-gold scale-105'
                    : 'bg-bg-main border border-border hover:border-oe-gold/30'
                }`}
                onClick={() => setSelectedPackage(idx)}
              >
                {pack.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-oe-gold text-black px-4 py-1 rounded-full text-sm font-bold font-display">
                    🔥 MÁS ELEGIDO
                  </div>
                )}

                <h3 className="text-3xl font-display font-black text-white mb-2">{pack.name}</h3>
                <p className="text-sm font-medium text-oe-gold mb-3">{pack.tagline}</p>
                <p className="text-text-muted italic mb-6">"{pack.emotion}"</p>

                <div className="text-4xl font-display font-black text-white mb-6">{pack.price}</div>

                <ul className="space-y-3 mb-6">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                      <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mb-6 p-3 rounded-xl bg-oe-gold/10 border border-oe-gold/20">
                  <p className="text-xs text-oe-gold font-medium">💡 Ideal para: {pack.ideal}</p>
                </div>

                <a
                  href={`https://wa.me/34699121023?text=Hola!%20Quiero%20info%20del%20pack%20${encodeURIComponent(
                    pack.name
                  )}`}
                  className={`group inline-flex items-center justify-center gap-2 w-full rounded-xl px-6 py-4 font-bold font-display transition-all ${
                    pack.highlight
                      ? 'oe-btn-gold'
                      : 'bg-bg-surface border border-oe-gold/30 text-white hover:border-oe-gold hover:bg-oe-gold/10'
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {pack.cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-white/50 mt-12 text-sm">
            ✨ Todos los packs incluyen: Configuración, prueba de sonido, técnico en el evento,
            coordinación con otros proveedores y desmontaje
          </p>
        </div>
      </section>

      {/* TESTIMONIOS REALES */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-surface to-bg-main">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-h2 text-center text-white mb-4">
            No Nos Creas A Nosotros.
            <br />
            <span className="text-oe-gold">Créeles A Ellos.</span>
          </h2>
          <p className="text-center text-text-muted mb-16 text-lg">
            Testimonios grabados justo después de la boda (máxima emoción)
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {realWeddings.map((wedding, idx) => (
              <div
                key={idx}
                className="rounded-3xl overflow-hidden bg-bg-surface border border-border hover:border-oe-gold/50 transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={wedding.image}
                    alt={`Boda ${wedding.couple}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(wedding.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-oe-gold text-oe-gold" />
                    ))}
                  </div>

                  <p className="text-white italic mb-4">"{wedding.quote}"</p>

                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-10 h-10 rounded-full bg-oe-gold/10 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-oe-gold" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{wedding.couple}</p>
                      <p className="text-xs text-text-muted">
                        {wedding.date} · {wedding.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GARANTÍA KAMIKAZE */}
      <section className="py-16 bg-gradient-to-r from-oe-gold/20 via-bg-surface to-oe-gold/20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Shield className="w-16 h-16 text-oe-gold mx-auto mb-6" />
          <h3 className="text-3xl font-display font-bold text-white mb-4">
            Garantía 100% Satisfacción
          </h3>
          <p className="text-xl text-text-muted mb-6">
            Si tu boda no es <span className="text-oe-gold font-bold">EXACTAMENTE</span> como la
            imaginaste, te devolvemos el 100% del importe. Sin preguntas.
          </p>
          <p className="text-sm text-white/50">
            En 87 bodas realizadas, nunca hemos tenido que aplicar esta garantía. Pero está ahí por
            si acaso.
          </p>
        </div>
      </section>

      {/* CTA FINAL BRUTAL */}
      <section className="py-20 sm:py-32 bg-bg-main">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl sm:text-6xl font-display font-black text-white mb-6">
            ¿Lista Para La Boda Que
            <br />
            <span className="text-oe-gold">Todos Van A Recordar?</span>
          </h2>

          <p className="text-xl text-text-muted mb-10">
            Solo quedan 4 sábados libres en Diciembre.
            <br />
            Si ya tienes fecha, <span className="text-oe-gold font-bold">contacta YA</span>.
          </p>

          <a
            href="https://wa.me/34699121023?text=Hola!%20Quiero%20reservar%20para%20mi%20boda"
            className="oe-btn-gold text-xl px-10 py-6 inline-flex items-center gap-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Calendar className="w-7 h-7" />
            Reservar Mi Fecha Ahora
            <ArrowRight className="w-6 h-6" />
          </a>

          <p className="text-white/50 text-sm mt-6">
            ⚡ Respuesta en menos de 2h · 💯 Presupuesto sin compromiso
          </p>
        </div>
      </section>
    </div>
  );
}
