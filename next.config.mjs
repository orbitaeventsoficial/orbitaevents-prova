/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  eslint: {
    ignoreDuringBuilds: true, // evita bloqueos por warning no críticos
  },
  typescript: {
    ignoreBuildErrors: false, // mantiene tipado estricto
  },
};

export default nextConfig;
