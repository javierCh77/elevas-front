// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3010', // o el puerto donde sirvas las imágenes
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
