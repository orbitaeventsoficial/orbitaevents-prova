// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // domains: ["res.cloudinary.com", "cdn.tu-cms.com"],
    // remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
