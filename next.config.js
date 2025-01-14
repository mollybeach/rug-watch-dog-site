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
        // Configure module resolution and aliases
        config.resolve = {
            ...config.resolve,
            modules: ['node_modules', '.'],
            alias: {
                ...config.resolve.alias,
                '@': '.',
                '@/components': './components',
                '@/lib': './lib',
                '@/styles': './styles',
                '@/types': './types'
            }
        };
        return config;
    },
    experimental: {
        optimizePackageImports: ['plotly.js-dist-min']
    }
};

module.exports = nextConfig;