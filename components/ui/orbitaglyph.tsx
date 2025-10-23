import Image from "next/image";

type Props = { className?: string; size?: number };
export default function OrbitaGlyph({ className = "", size = 48 }: Props) {
  return (
    <Image
      src="/img/brand/orbitaglyphgold.png"
      alt="Isotipo Òrbita"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}
