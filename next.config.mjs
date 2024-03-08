import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = { fs: false }
    // config.resolve.mainFields = ['module', 'main']

    return config
  },
  env: {
    API_URL: process.env.API_URL,
  },
}

export default withNextIntl(nextConfig)
