import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  domains: ['res.cloudinary.com'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
