import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        "oe-black": "var(--oe-black)",
        "oe-black-2": "var(--oe-black-2)",
        "oe-white": "var(--oe-white)",
        "oe-gray": "var(--oe-gray)",
        "oe-gold": "var(--oe-gold)",
        "oe-amber": "var(--oe-amber)",
        "oe-magenta": "var(--oe-magenta)",
        "oe-bg": "var(--oe-black)",
        "oe-muted": "rgba(255,255,255,0.65)",
        "oe-edge": "rgba(255,255,255,0.10)",
      },
      borderColor: { DEFAULT: "rgba(255,255,255,0.10)" },
      boxShadow: {
        "oe-card": "0 0 0 1px rgba(255,255,255,0.08), 0 8px 30px rgba(0,0,0,0.35)",
        soft: "var(--shadow-soft)",
        hard: "var(--shadow-hard)",
      },
      borderRadius: {
        r1: "var(--r1)",
        r2: "var(--r2)",
        r3: "var(--r3)",
      },
      backdropBlur: { xs: "2px" },
    },
  },
  plugins: [typography],
};

export default config;
