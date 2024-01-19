/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ['pino-pretty', 'pino'],
    },
  }

module.exports = nextConfig
