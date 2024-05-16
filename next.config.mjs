/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dk5b2zjck",
    },
    async headers() {
        return [
            {
                source: "/api/(.*)",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*",
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE, OPTIONS",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-type, Authorization",
                    },
                    {
                        key: "Content-Range",
                        value: "bytes : 0-9/*",
                    }
                ]
            }
        ]
    },
    images: {
        domains: ['covers.openlibrary.org', 'books.google.com', 'cdn-icons-png.flaticon.com' ],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com"
            },
            {
                protocol: "https",
                hostname: "books.google.com"
            },
            {
                protocol: "https",
                hostname: "covers.openlibrary.org"
            },
        ],
    },
}

export default nextConfig
