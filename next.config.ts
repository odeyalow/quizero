import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: ''
      }
    ],
  },
  i18n: {
    locales: ['ru'],
    defaultLocale: 'ru',
  },
};

export default nextConfig;
