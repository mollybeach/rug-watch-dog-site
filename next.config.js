/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                net: false,
                tls: false,
                path: false,
                crypto: require.resolve('crypto-browserify'),
                stream: require.resolve('stream-browserify'),
                url: require.resolve('url'),
                zlib: require.resolve('browserify-zlib'),
                http: require.resolve('stream-http'),
                https: require.resolve('https-browserify'),
                assert: require.resolve('assert'),
                os: require.resolve('os-browserify'),
                process: require.resolve('process/browser'),
            };
        }
        return config;
    },
    // Handle font loading
    transpilePackages: ['@next/font', 'next/font'],
    experimental: {
        serverComponentsExternalPackages: ['pg', '@aws-sdk/client-rds', 'pg-native']
    }
};

module.exports = nextConfig;