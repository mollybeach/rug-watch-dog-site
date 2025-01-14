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
    // Add baseUrl and paths directly in Next.js config
    modularizeImports: {
        '@/components': {
            transform: './components/{{member}}'
        },
        '@/lib': {
            transform: './lib/{{member}}'
        }
    }
};

module.exports = nextConfig;