import { NextConfig } from 'next'

const nextConfig: NextConfig = {
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