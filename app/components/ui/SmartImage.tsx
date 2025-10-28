// app/components/ui/SmartImage.tsx
import Image, { type ImageProps } from "next/image";
export default function SmartImage(props: ImageProps){
  const { sizes = "(max-width: 768px) 100vw, 1200px", priority=false, ...rest } = props as any;
  return <Image sizes={sizes} priority={priority} {...rest} />;
}
