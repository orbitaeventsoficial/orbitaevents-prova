// next.config.ts
import { withBotId } from 'botid/next/config';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: 'https', hostname: '**.vercel.app' },
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactCompiler: process.env.NODE_ENV === 'production', // ← ESENCIAL: Next.js 16+
  },

  async headers() {
    return [
      {
        source: '/img/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/video/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    instrumentationHook: true, // ← ESENCIAL: Activa instrumentation-client.ts
  },

  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://orbitaevents.com',
  },
};

// ENVUELVE CON BOTID (anti-bots en reservas)
export default withBotId(nextConfig);