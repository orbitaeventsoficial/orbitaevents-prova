/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "bg-main": "var(--bg-main)",
        "bg-surface": "var(--bg-surface)",
        "bg-card": "var(--bg-card)",
        "bg-glass": "var(--bg-glass)",
        border: "var(--border)",
        "border-hover": "var(--border-hover)",
        "border-glow": "var(--border-glow)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-disabled": "var(--text-disabled)",
        "oe-gold": "var(--oe-gold)",
        "oe-gold-light": "var(--oe-gold-light)",
        "oe-gold-dark": "var(--oe-gold-dark)",
        "oe-gold-bright": "var(--oe-gold-bright)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"]
      }
      // ⬆️ Mantén el resto de tu extend aquí si quieres (keyframes, animations, etc.)
    }
  },
  plugins: []
};
