/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = { fs: false }

    return config
  },
  env: {
    API_URL: process.env.API_URL,
  },
}

export default nextConfig
