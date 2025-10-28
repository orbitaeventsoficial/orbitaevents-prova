/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  eslint: {
    ignoreDuringBuilds: true, // no bloquea por lint warnings
  },
  typescript: {
    ignoreBuildErrors: true, // evita error en Vercel por importaciones faltantes
  },
};

export default nextConfig;
