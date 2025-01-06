import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['fakestoreapi.com'],
    unoptimized: true,
  },
  // output: 'export',
};

export default nextConfig;
