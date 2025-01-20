/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        // Ignore native modules on the client-side
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                path: false,
                os: false,
            };
        }

        // Add any additional Webpack configuration here
        config.module.rules.push({
            test: /\.html$/,
            use: 'ignore-loader', // Ignore HTML files
        });

        return config;
    },
};

export default nextConfig;