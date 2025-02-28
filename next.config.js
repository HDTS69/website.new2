/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent-syd2-1.cdninstagram.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Enable image optimization for production
    unoptimized: process.env.NODE_ENV === 'development',
    // Use modern image formats when supported
    formats: ['image/avif', 'image/webp'],
    // Minimize image size in memory
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  reactStrictMode: true,
  // Improve performance with better compression
  compress: true,
  // Add HTTP/2 headers for better performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
    ];
  },
  experimental: {
    // Enable optimizations
    appDocumentPreloading: true,
    // Enable modern JavaScript features
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Optimize page loading
    optimizePackageImports: [
      'framer-motion', 
      'lucide-react', 
      '@radix-ui/react-popover', 
      '@radix-ui/react-slot', 
      '@radix-ui/react-tooltip',
      '@tsparticles/engine',
      '@tsparticles/react',
      '@tsparticles/slim',
      'aos',
      'class-variance-authority',
      'clsx',
      'react-fast-marquee',
      'simplex-noise',
      'tailwind-merge'
    ],
    // Add Turbopack configuration
    turbo: {
      rules: {
        // Configure Turbopack rules to match webpack configuration
        // This ensures consistency between webpack and Turbopack
        minify: process.env.NODE_ENV === 'production',
        // Add any other Turbopack-specific rules here
      },
    },
  },
  compiler: {
    styledComponents: true,
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Add environment variables with default values for build time
  env: {
    // Supabase configuration
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-supabase-url.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key',
    
    // Google Maps API (if needed)
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'placeholder-google-maps-key',
    
    // Add any other required environment variables here with fallbacks
    // NODE_ENV is managed by Next.js and should not be set here
  },
  // Configure webpack for better performance
  webpack: (config, { dev, isServer }) => {
    // Enable HMR and Fast Refresh
    if (dev && !isServer) {
      config.optimization.moduleIds = 'named';
      config.optimization.chunkIds = 'named';
    }
    
    // If client-side, don't polyfill fs
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
        crypto: false,
      };
    }
    
    // Add terser for better minification
    if (process.env.NODE_ENV === 'production') {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // Get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                if (!module.context) {
                  return 'npm.unknown';
                }
                
                const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
                if (!match || !match[1]) {
                  return 'npm.unknown';
                }
                
                // Create a clean package name for better readability in bundles
                return `npm.${match[1].replace('@', '')}`;
              },
            },
            // Separate chunks for large libraries
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'npm.react',
              priority: 20,
            },
            framerMotion: {
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              name: 'npm.framer-motion',
              priority: 10,
            },
            particles: {
              test: /[\\/]node_modules[\\/](@tsparticles)[\\/]/,
              name: 'npm.tsparticles',
              priority: 10,
            },
          },
        },
      };
    }
    
    return config;
  },
}

// Add bundle analyzer in analyze mode
const withBundleAnalyzer = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config) => config;

module.exports = withBundleAnalyzer(nextConfig);
