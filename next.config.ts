import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    domains: ['firebasestorage.googleapis.com', 'images.unsplash.com', 'cdn.pixabay.com'],
  },
  i18n: {
    locales: ['ru'],
    defaultLocale: 'ru',
  },
};

export default nextConfig;
