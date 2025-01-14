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
        // Add module aliases using absolute paths
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': '/vercel/path0',
            '@/components': '/vercel/path0/components',
            '@/lib': '/vercel/path0/lib'
        };
        return config;
    },
    experimental: {
        optimizePackageImports: ['plotly.js-dist-min']
    }
};

module.exports = nextConfig;