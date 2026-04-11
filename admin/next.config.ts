import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  // Ensure Node.js APIs work in API routes
  serverExternalPackages: [],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Allow fs operations in API routes
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

export default nextConfig
