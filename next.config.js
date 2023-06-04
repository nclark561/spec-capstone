/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    // Generate Prisma Client during Next.js build
    const { execSync } = require('child_process');
    execSync('npx prisma generate');

    return [];
  },
}

module.exports = nextConfig
