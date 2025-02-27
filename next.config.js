/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  reactStrictMode: true,
  output: 'export',
  distDir: '.next',
  experimental: {
    appDocumentPreloading: false,
  },
}

module.exports = nextConfig;
