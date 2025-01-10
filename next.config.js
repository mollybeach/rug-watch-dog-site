const { setupDevPlatform } = require("@cloudflare/next-on-pages/next-dev");

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        // Handle Node.js built-in modules
        config.resolve = {
            ...config.resolve,
            fallback: {
                ...config.resolve.fallback,
                'async_hooks': false,
                'fs': false,
                'net': false,
                'tls': false,
                'crypto': false,
                'path': false,
                'stream': false,
                'http': false,
                'https': false,
                'zlib': false
            }
        }
        return config;
    },
    images: {
        unoptimized: true,
        domains: ['res.cloudinary.com'],
    },
    basePath: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? '' : '',
    assetPrefix: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? '' : '',
};

if (process.env.NODE_ENV === "development") {
    try {
        setupDevPlatform();
    } catch (e) {
        console.warn("Failed to setup dev platform:", e);
    }

}

module.exports = nextConfig;