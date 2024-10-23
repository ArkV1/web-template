/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true, // Disable Next.js image optimization
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
        ],
        dangerouslyAllowSVG: true, // Add this line
        contentDispositionType: 'attachment', // Optional: adds extra security
    },
};

export default nextConfig;
