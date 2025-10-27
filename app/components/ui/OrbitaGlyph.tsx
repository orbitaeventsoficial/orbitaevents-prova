import * as React from "react";

type Props = {
  size?: number;
  className?: string;
  /** Texto accesible. Si es decorativo, ignóralo o pon decorative=true */
  title?: string;
  /** Si es solo decorativo, ocúltalo del árbol de accesibilidad */
  decorative?: boolean;
  /** Prefijo para evitar colisiones de <defs>. Cambia si renderizas varios. */
  idBase?: string;
};

/**
 * OrbitaGlyph — glifo planeta+anillo.
 * - No usa "use client".
 * - Hereda color vía currentColor.
 * - Evita colisiones de <defs> con idBase.
 */
const OrbitaGlyph = React.memo(
  React.forwardRef<SVGSVGElement, Props>(function OrbitaGlyph(
    { size = 64, className = "", title = "Òrbita", decorative = false, idBase = "og" },
    ref
  ) {
    const s = Math.max(12, size);
    const gradId = `${idBase}-grad`;

    return (
      <svg
        ref={ref}
        width={s}
        height={s}
        viewBox="0 0 64 64"
        role={decorative ? undefined : "img"}
        aria-hidden={decorative || undefined}
        aria-label={decorative ? undefined : title}
        focusable="false"
        className={className}
      >
        {!decorative && <title>{title}</title>}

        <defs>
          <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Planeta */}
        <circle cx="32" cy="32" r="16" fill={`url(#${gradId})`} />

        {/* Anillo */}
        <g transform="translate(32 32) rotate(-18)">
          <ellipse
            cx="0"
            cy="0"
            rx="26"
            ry="10"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.6"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          {/* Parte delantera del anillo, sobre el planeta */}
          <path
            d="M-26 0a26 10 0 0 0 52 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.9"
            vectorEffect="non-scaling-stroke"
          />
        </g>

        {/* Brillos sutiles */}
        <circle cx="25" cy="25" r="3" fill="#fff" fillOpacity="0.25" />
        <circle cx="40" cy="40" r="2" fill="#fff" fillOpacity="0.18" />
      </svg>
    );
  })
);

export default OrbitaGlyph;
