import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:3006/uploads/:path*',
      },
    ];
  },
  
};

export default nextConfig;
