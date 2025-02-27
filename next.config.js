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
  swcMinify: true,
  output: 'export',
  distDir: 'out',
  experimental: {
    appDocumentPreloading: true,
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    // If client-side, don't polyfill fs
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
        crypto: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig;
