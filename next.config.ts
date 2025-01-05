import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['fakestoreapi.com'],
    unoptimized: true
  },
  output: 'export',
  basePath: '/SPA-test', // Замените REPO_NAME на имя вашего репозитория
};

export default nextConfig;
