import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.svgporn.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "*.githubusercontent.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  serverExternalPackages: ["mongoose"],
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
