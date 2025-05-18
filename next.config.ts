import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
        domains: ['cloud.appwrite.io'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cloud.appwrite.io',
                port: '',
                pathname: '/v1/storage/**',
            },
        ],
    },
  /* config options here */
};

export default nextConfig;
