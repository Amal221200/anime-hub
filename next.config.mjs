import withPWA from "next-pwa"

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

export default withPWA({ dest: 'public' })(nextConfig);
