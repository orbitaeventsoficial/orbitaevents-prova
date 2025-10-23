import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "oe-black": "#0a0a0b",
        "oe-black-2": "#0b0c0d",
        "oe-gold": "#d7b86e",
        "oe-amber": "#ffbb33",
        "oe-magenta": "#b62fbf",
        "oe-white": "#f5f5f5",
        "oe-gray": "#9ca3af",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.25)",
        hard: "0 4px 12px rgba(0,0,0,0.4)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
