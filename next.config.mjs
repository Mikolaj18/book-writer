/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'peaceful-peacock-731.convex.cloud'
            }
        ]
    }
};

export default nextConfig;
