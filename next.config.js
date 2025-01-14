/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        functionConfig: {
            memory: 1024,
            maxDuration: 10
        }
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        return config;
    }
}

module.exports = nextConfig