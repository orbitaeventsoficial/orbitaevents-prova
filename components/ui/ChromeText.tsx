import * as React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * ChromeText: texto con efecto cromado/metal pulido ligero.
 * Cambia Tailwind si quieres otro acabado.
 */
export default function ChromeText({ children, className = "" }: Props) {
  return (
    <span
      className={`bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-300 drop-shadow-sm ${className}`}
    >
      {children}
    </span>
  );
}