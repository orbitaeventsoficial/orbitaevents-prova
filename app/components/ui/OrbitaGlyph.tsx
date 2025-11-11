// app/components/ui/OrbitaGlyph.tsx
import * as React from "react";
import { motion } from "framer-motion";

type Props = {
  size?: number;
  className?: string;
  title?: string;
  decorative?: boolean;
  idBase?: string;
};

const OrbitaGlyph = React.memo(
  React.forwardRef<SVGSVGElement, Props>(function OrbitaGlyph(
    { size = 64, className = "", title = "Òrbita", decorative = false, idBase = "og" },
    ref
  ) {
    const s = Math.max(12, size);
    const gradId = `${idBase}-grad`;

    return (
      <motion.svg
        ref={ref}
        width={s}
        height={s}
        viewBox="0 0 64 64"
        role={decorative ? undefined : "img"}
        aria-hidden={decorative || undefined}
        aria-label={decorative ? undefined : title}
        focusable="false"
        className={`${className} glow-gold float`}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {!decorative && <title>{title}</title>}

        <defs>
          <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Planeta */}
        <motion.circle
          cx="32"
          cy="32"
          r="16"
          fill={`url(#${gradId})`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

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

        {/* Brillos */}
        <circle cx="25" cy="25" r="3" fill="#fff" fillOpacity="0.25" />
        <circle cx="40" cy="40" r="2" fill="#fff" fillOpacity="0.18" />
      </motion.svg>
    );
  })
);

export default OrbitaGlyph;
