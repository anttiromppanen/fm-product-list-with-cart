/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "kmmifmulwm7jhdqq.public.blob.vercel-storage.com",
        port: "",
      }
    ]
  }
};

export default nextConfig;
