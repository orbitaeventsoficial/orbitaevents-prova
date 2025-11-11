import Image from "next/image";

export default function LogoWall() {
  const logos = [
    { src: "/logos/cliente1.webp", alt: "Moto Offroad Academy", w: 160, h: 80 },
    { src: "/logos/cliente2.webp", alt: "Masia El Massaguer", w: 160, h: 80 },
    { src: "/logos/cliente3.webp", alt: "AECC", w: 160, h: 80 },
    { src: "/logos/cliente4.webp", alt: "Clap", w: 160, h: 80 },
    { src: "/logos/cliente5.webp", alt: "Ajuntament de Granollers", w: 160, h: 80 },
    { src: "/logos/cliente6.webp", alt: "Ajuntament de Terrassa", w: 160, h: 80 },
    { src: "/logos/cliente7.webp", alt: "MG Medicina Estètica", w: 160, h: 80 },
    { src: "/logos/cliente8.webp", alt: "Zona Motor L'Ametlla Park", w: 160, h: 80 },
  ];

  return (
    <section className="bg-white/5 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-sm uppercase tracking-widest text-white/60">
          Marcas que confían
        </p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-8 place-items-center">
          {logos.map((l) => (
            <Image
              key={l.alt}
              src={l.src}
              alt={l.alt}
              width={l.w}
              height={l.h}
              className="object-contain opacity-80 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
