import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
    // Serve AVIF first (smallest), fall back to WebP — both are served by the next/image optimizer
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 1 year (they are content-hashed)
    minimumCacheTTL: 31536000,
    // Match real mobile breakpoints so 390px phones get a small image, not desktop size
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    // Sizes for fixed-dimension images (logos, avatars)
    imageSizes: [16, 32, 40, 48, 64, 80, 96, 128, 256],
  },
  async headers() {
    return [
      {
        // Long-lived immutable cache for hashed static assets (_next/static)
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache custom static public assets
        source: "/new-images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache optimized video assets
        source: "/dpm-experience-compressed.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
