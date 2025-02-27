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
  },
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
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
      '@radix-ui/react-tooltip'
    ],
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
    
    // Add terser for better minification
    if (process.env.NODE_ENV === 'production') {
      config.optimization = {
        ...config.optimization,
        minimize: true,
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
