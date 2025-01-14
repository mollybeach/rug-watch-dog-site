/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                path: false,
                stream: false
            };
        }
        return config;
    },
    experimental: {
        optimizePackageImports: ['plotly.js-dist-min']
    },
    images: {
        domains: ['rugwatchdog.com', 'assets.rugwatchdog.com'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        formats: ['image/webp']
    },
    assetPrefix: process.env.NODE_ENV === 'production' ?
        'https://assets.rugwatchdog.com' : ''
};

module.exports = nextConfig;