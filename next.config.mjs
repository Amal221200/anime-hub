import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
    // cacheOnFrontEndNav: true,
    // aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    dest: "public",
    // workboxOptions: {
    //     disableDevLogs: true,
    // },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io"
            },
        ]
    },
    reactStrictMode: true
};

export default withPWA(nextConfig);