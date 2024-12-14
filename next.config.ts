import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's2.glbimg.com',
      },
      {
        protocol: 'https',
        hostname: 'static.ifood-static.com.br',
      },
    ],
  },
};

export default nextConfig;
