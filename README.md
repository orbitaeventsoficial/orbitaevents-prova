# Òrbita Events — Next.js 14 (App Router)

Base vercel-friendly, sin hacks, con App Router y Tailwind.

## Requisitos
- Node 18 o 20
- pnpm 9

## Instalación
```bash
corepack enable
corepack prepare pnpm@9 --activate
pnpm install
pnpm run dev
```

## Build y deploy (Vercel)
```bash
pnpm run build
pnpm dlx vercel@latest --prod --yes
```

## Reglas
- No imports desde `/public` ni `?raw`.
- Header global único.
- Icono: `/public/img/brand/favicon.svg`.
- Tipografía: Inter (`app/layout.tsx`).
