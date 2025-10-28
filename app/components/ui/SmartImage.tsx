// app/components/ui/SmartImage.tsx
import NextImage, { type ImageProps } from "next/image";

function isSvg(src: unknown) {
  return typeof src === "string" && /\.svg($|\?)/i.test(src);
}
function isRemote(src: unknown) {
  return typeof src === "string" && /^https?:\/\//i.test(src);
}

export default function SmartImage(props: ImageProps) {
  const { src, sizes = "(max-width: 768px) 100vw, 1200px", priority = false, alt, ...rest } = props as any;

  // Evita optimizer en SVG y en remotas (si tu next.config no las permite)
  if (isSvg(src) || isRemote(src)) {
    // Mantén fill/width/height según lo que uses, pero sin optimizer
    const common = typeof rest.fill === "boolean" && rest.fill
      ? { style: { objectFit: rest.style?.objectFit ?? "cover" } }
      : { width: rest.width ?? 1200, height: rest.height ?? 800, style: { objectFit: rest.style?.objectFit ?? "cover" } };

    return <img src={String(src)} alt={alt ?? ""} {...common} className={rest.className} />;
  }

  // Raster local: usa next/image normal
  return <NextImage src={src} alt={alt} sizes={sizes} priority={priority} {...rest} />;
}
