/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [
            {
                source: '/pages/:path*',
                destination: '/:path*',
            },
        ]
    },
}

module.exports = nextConfig
