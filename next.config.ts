import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // 빌드 시 TypeScript 에러를 무시합니다.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
