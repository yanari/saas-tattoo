import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'img.freepik.com',
      },
      {
        hostname: 'loremflickr.com',
      },
    ],
  },
}

export default nextConfig
