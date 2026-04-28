import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/servizi', destination: '/percorsi', permanent: true },
    ]
  },
};

export default nextConfig;
