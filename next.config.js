/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        // Will only be available on the server side
        functionConfig: {
            memory: 1024,
            maxDuration: 10
        }
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig