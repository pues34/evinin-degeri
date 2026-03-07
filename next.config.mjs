import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/(.*).(svg|jpg|jpeg|png|gif|ico|webp|mp4|webm)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/_next/image(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: '**', // Allow any domain for user-uploaded listings if needed, or specific supabase host
            }
        ],
    },
};

export default withSentryConfig(
    nextConfig,
    {
        silent: true,
        org: "evinin-degeri",
        project: "evinin-degeri",
    },
    {
        widenClientFileUpload: true,
        transpileClientSDK: true,
        hideSourceMaps: true,
        disableLogger: true,
        automaticVercelMonitors: true,
    }
);
