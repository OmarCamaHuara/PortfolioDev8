/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'github.com'],
  },
  sassOptions: {
    includePaths: ['./src/styles'],
  },
};

export default nextConfig;