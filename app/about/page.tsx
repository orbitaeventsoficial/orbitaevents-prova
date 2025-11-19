import { Star, Users, Calendar, Zap, Music, Lightbulb, Sparkles, PartyPopper, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Òrbita Events - Discomóvil, Bodas Tematizadas y Fiestas Épicas en Barcelona',
  description: 'Desde 2024, especialistas en discomóvil con DJ profesional, luces FX, tematización de bodas y fiestas temáticas: Harry Potter, Halloween, Navidad, hawaianas. Fiestas infantiles, animaciones y trivial interactivo. ¡Tu evento inolvidable!',
};

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-bg-main py-20">
      <div className="mx-auto max-w-6xl px-4">

        {/* HERO SEO + EMOCIÓN */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Nacimos en 2024 para
            <br />
            <span className="gradient-text">Hacer Fiestas que Marcan Vidas</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            <strong>Discomóvil profesional</strong> con DJ itinerante, luces FX espectaculares y tematización total. 
            Bodas con puestas en escena mágicas, fiestas temáticas (Harry Potter, Halloween, Navidad, hawaianas) 
            y animaciones interactivas para infantiles y adultos. ¡Tenemos ganas, tiempo y equipo PRO para tu evento!
          </p>
        </div>

        {/* NÚMEROS SEO (AÑADE REALES CUANDO TENGAS) */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Calendar, value: "2+", label: "Años Independientes" },
            { icon: Star, value: "5.0", label: "Satisfacción Clientela" },
            { icon: PartyPopper, value: "50+", label: "Fiestas Temáticas" },
            { icon: Zap, value: "100%", label: "Eventos Épicos" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="oe-card p-6 text-center rounded-3xl">
                <Icon className="w-10 h-10 text-oe-gold mx-auto mb-3" />
                <p className="text-4xl font-black text-oe-gold">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* NUESTRA HISTORIA (SEO + CONFIANZA) */}
        <div className="oe-card p-10 rounded-3xl mb-20">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Nuestra Historia: De la Pasión a la Independencia
          </h2>
          <p className="text-lg text-white/80 leading-relaxed text-center max-w-4xl mx-auto">
            Llevamos <strong>años produciendo fiestas infantiles, temáticas y para adultos</strong>. 
            En 2024 nos independizamos con <strong>Òrbita Events</strong> para darte lo mejor: 
            <strong>discomóvil con equipo completo</strong> (DJ profesional, luces LED, FX como humo, CO2, confeti), 
            <strong>tematización total</strong> y puestas en escena que dejan boquiabiertos.
          </p>
          <p className="text-lg text-white/80 leading-relaxed text-center max-w-4xl mx-auto mt-4">
            <strong>Bodas</strong> son nuestra especialidad: ceremonias emotivas, cócteles animados y fiestas donde bailan hasta los abuelos. 
            Creamos mundos: <strong>fiestas Harry Potter</strong> con varitas luminosas, <strong>Halloween</strong> terroríficas, 
            <strong>Navidad</strong> mágica, <strong>hawaianas</strong> tropicales, <strong>fin de año</strong> explosivo... 
            ¡Y trivial interactivo, animaciones y juegos para que nadie pare!
          </p>
          <p className="text-oe-gold text-xl font-bold text-center mt-6 animate-pulse">
            🔥 Equipo DJ profesional, luces FX y ganas infinitas. ¡Tu encargo es nuestro próximo hit!
          </p>
        </div>

        {/* QUÉ OFRECEMOS (KEYWORDS SEO) */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Lo Que Hacemos (y Amamos)
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Music, title: "Discomóvil Itinerante", desc: "DJ profesional + equipo completo para cualquier localización." },
              { icon: Lightbulb, title: "Luces y FX Espectaculares", desc: "LED, láser, humo, CO2, confeti. Efectos que hacen fotos virales." },
              { icon: Sparkles, title: "Tematización Total", desc: "Harry Potter, Halloween, Navidad, hawaianas, fin de año. Mundos inmersivos." },
              { icon: PartyPopper, title: "Fiestas Infantiles", desc: "Animaciones, juegos, trivial interactivo. Diversión garantizada." },
              { icon: Users, title: "Bodas Épicas", desc: "Puestas en escena mágicas, ceremonia + baile inolvidable." },
              { icon: Zap, title: "Animaciones Interactivas", desc: "Trivial, juegos, dinámicas. Nadie se queda quieto." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="oexm-card p-6 rounded-3xl text-center hover:border-oe-gold/50 transition-all">
                  <Icon className="w-12 h-12 text-oe-gold mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* EQUIPO (HUMANIZA) */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            El Equipo Detrás de la Magia
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Tú (DJ Estrella)", role: "Fundador & Maestro de Pistas", desc: "Lectura de ambiente nivel pro. Temazo en el momento exacto." },
              { name: "Técnico FX", role: "Rey de Luces y Efectos", desc: "CO2, láser, humo. Hace que parezca Hollywood." },
              { name: "Animador Temático", role: "Creador de Mundos", desc: "Harry Potter, Halloween... Transforma espacios." },
            ].map((member, i) => (
              <div key={i} className="oe-card p-6 rounded-3xl text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-oe-gold to-oe-gold" />
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-oe-gold text-sm mb-2">{member.role}</p>
                <p className="text-sm text-white/70">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA FINAL SEO */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Listo para Tu Fiesta Épica?
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Discomóvil, bodas tematizadas, fiestas Harry Potter o infantiles con animación. 
            ¡Contáctanos y reserva tu fecha antes de que vuele!
          </p>
          <a
            href="https://wa.me/34699121023?text=Hola,%20quiero%20mi%20fiesta%20tem%C3%A1tica%20/%20boda%20/%20discom%C3%B3vil"
            className="oe-btn-gold text-xl px-10 py-6 inline-flex items-center gap-3"
          >
            Reservar Ahora (Respuesta en 2h)
            <ArrowRight className="w-6 h-6" />
          </a>
          <p className="text-sm text-white/60 mt-4">
            📍 Barcelona y alrededores · 🚚 Discomóvil itinerante · 🎉 Disponibilidad inmediata
          </p>
        </div>
      </div>
    </section>
  );
}

