import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    forceSwcTransforms: false
  },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true
    }
    return config
  }
}

module.exports = nextConfig