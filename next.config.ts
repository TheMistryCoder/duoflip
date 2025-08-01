import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Prevent ESLint errors from failing your production build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
