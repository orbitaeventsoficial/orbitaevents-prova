type Props = { className?: string; size?: number };
export default function OrbitaGlyph({ className = "", size = 48 }: Props) {
  return (
    <img
      src="/img/brand/orbitaglyphgold.png"
      alt="Isotipo Òrbita"
      width={size}
      height={size}
      className={className}
      loading="eager"
      decoding="sync"
    />
  );
}