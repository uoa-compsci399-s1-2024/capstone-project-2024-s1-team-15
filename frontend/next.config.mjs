/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.amazonaws.com',
                port: ''
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000'
            },
        ],
    }
}

export default nextConfig
