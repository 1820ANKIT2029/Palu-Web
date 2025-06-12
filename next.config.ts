import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,  // turn false for type safe and error free compile later
  },
};

export default nextConfig;
