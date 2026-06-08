import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: 'legalcompliance.tde.com.co' }],
        destination: '/scanner',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
