const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  nextConfigPath: 'next.config.js',
  optimizations: {
    // Image optimization
    images: {
      formats: ['image/avif', 'image/webp'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
      imageSizes: [16, 32, 48, 64, 96, 128, 256],
      minimumCacheTTL: 60,
      dangerouslyAllowSVG: true,
    },
    // Compiler options
    compiler: {
      removeConsole: {
        exclude: ['error', 'warn'],
      },
    },
    // Experimental features
    experimental: {
      optimizeCss: true,
      optimizePackageImports: [
        'framer-motion',
        'react-icons',
        'lodash',
        '@mui/material',
        '@mui/icons-material',
      ],
      // Enable server components
      serverComponents: true,
      // Enable concurrent features
      concurrentFeatures: true,
      // Enable React server components
      serverActions: true,
    },
    // Production only optimizations
    productionBrowserSourceMaps: false,
    // Compression
    compress: true,
    // Webpack optimizations
    webpack: {
      // Bundle analyzer
      bundleAnalyzer: true,
    },
    // Font optimization
    fontOptimization: true,
    // Preload optimization
    preloadOptimization: true,
  },
};

// Function to read the current Next.js config
function readNextConfig() {
  try {
    if (!fs.existsSync(config.nextConfigPath)) {
      console.log(`Next.js config file not found at ${config.nextConfigPath}`);
      return null;
    }

    const configContent = fs.readFileSync(config.nextConfigPath, 'utf8');
    return configContent;
  } catch (error) {
    console.error(`Error reading Next.js config: ${error.message}`);
    return null;
  }
}

// Function to generate the optimized Next.js config
function generateOptimizedConfig(currentConfig) {
  // If no current config, create a new one
  if (!currentConfig) {
    return `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: ${JSON.stringify(config.optimizations.images, null, 2)},
  compiler: ${JSON.stringify(config.optimizations.compiler, null, 2)},
  experimental: ${JSON.stringify(config.optimizations.experimental, null, 2)},
  productionBrowserSourceMaps: ${config.optimizations.productionBrowserSourceMaps},
  compress: ${config.optimizations.compress},
  webpack: (config, { dev, isServer }) => {
    // Add bundle analyzer in production build
    if (!dev && !isServer && ${config.optimizations.webpack.bundleAnalyzer}) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: '../bundle-analysis.html',
          openAnalyzer: false,
        })
      );
    }

    // Optimize CSS
    if (!dev && ${config.optimizations.experimental.optimizeCss}) {
      const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
      config.optimization.minimizer = config.optimization.minimizer || [];
      config.optimization.minimizer.push(new CssMinimizerPlugin());
    }

    return config;
  },
  // Font optimization
  optimizeFonts: ${config.optimizations.fontOptimization},
  // Preload optimization
  experimental: {
    ...${JSON.stringify(config.optimizations.experimental, null, 2)},
    optimizeServerReact: true,
  },
};

module.exports = nextConfig;`;
  }

  // Parse the current config and enhance it
  // This is a simplified approach - in a real scenario, you'd want to use an AST parser
  let enhancedConfig = currentConfig;

  // Add or update images config
  if (!enhancedConfig.includes('images:') && !enhancedConfig.includes('images :')) {
    enhancedConfig = enhancedConfig.replace(
      /const nextConfig = {/,
      `const nextConfig = {\n  images: ${JSON.stringify(config.optimizations.images, null, 2)},`
    );
  }

  // Add or update compiler config
  if (!enhancedConfig.includes('compiler:') && !enhancedConfig.includes('compiler :')) {
    enhancedConfig = enhancedConfig.replace(
      /const nextConfig = {/,
      `const nextConfig = {\n  compiler: ${JSON.stringify(config.optimizations.compiler, null, 2)},`
    );
  }

  // Add or update experimental config
  if (!enhancedConfig.includes('experimental:') && !enhancedConfig.includes('experimental :')) {
    enhancedConfig = enhancedConfig.replace(
      /const nextConfig = {/,
      `const nextConfig = {\n  experimental: ${JSON.stringify(config.optimizations.experimental, null, 2)},`
    );
  } else {
    // Try to enhance existing experimental config
    const experimentalMatch = enhancedConfig.match(/experimental:\s*{([^}]*)}/);
    if (experimentalMatch) {
      const currentExperimental = experimentalMatch[0];
      const enhancedExperimental = currentExperimental.replace(
        /{([^}]*)/,
        `{\n    optimizeCss: true,\n    optimizePackageImports: ${JSON.stringify(config.optimizations.experimental.optimizePackageImports)},\n    serverComponents: true,\n    concurrentFeatures: true,\n    serverActions: true,$1`
      );
      enhancedConfig = enhancedConfig.replace(currentExperimental, enhancedExperimental);
    }
  }

  // Add or update webpack config
  if (!enhancedConfig.includes('webpack:') && !enhancedConfig.includes('webpack :')) {
    enhancedConfig = enhancedConfig.replace(
      /const nextConfig = {/,
      `const nextConfig = {\n  webpack: (config, { dev, isServer }) => {
    // Add bundle analyzer in production build
    if (!dev && !isServer && ${config.optimizations.webpack.bundleAnalyzer}) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: '../bundle-analysis.html',
          openAnalyzer: false,
        })
      );
    }

    // Optimize CSS
    if (!dev && ${config.optimizations.experimental.optimizeCss}) {
      const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
      config.optimization.minimizer = config.optimization.minimizer || [];
      config.optimization.minimizer.push(new CssMinimizerPlugin());
    }

    return config;
  },`
    );
  }

  // Add or update productionBrowserSourceMaps
  if (!enhancedConfig.includes('productionBrowserSourceMaps:') && !enhancedConfig.includes('productionBrowserSourceMaps :')) {
    enhancedConfig = enhancedConfig.replace(
      /const nextConfig = {/,
      `const nextConfig = {\n  productionBrowserSourceMaps: ${config.optimizations.productionBrowserSourceMaps},`
    );
  }

  // Add or update compress
  if (!enhancedConfig.includes('compress:') && !enhancedConfig.includes('compress :')) {
    enhancedConfig = enhancedConfig.replace(
      /const nextConfig = {/,
      `const nextConfig = {\n  compress: ${config.optimizations.compress},`
    );
  }

  // Add or update optimizeFonts
  if (!enhancedConfig.includes('optimizeFonts:') && !enhancedConfig.includes('optimizeFonts :')) {
    enhancedConfig = enhancedConfig.replace(
      /const nextConfig = {/,
      `const nextConfig = {\n  optimizeFonts: ${config.optimizations.fontOptimization},`
    );
  }

  // Ensure swcMinify is enabled
  if (!enhancedConfig.includes('swcMinify:') && !enhancedConfig.includes('swcMinify :')) {
    enhancedConfig = enhancedConfig.replace(
      /const nextConfig = {/,
      `const nextConfig = {\n  swcMinify: true,`
    );
  }

  return enhancedConfig;
}

// Function to write the optimized config
function writeOptimizedConfig(optimizedConfig) {
  try {
    // Create a backup of the original config
    if (fs.existsSync(config.nextConfigPath)) {
      const backupPath = `${config.nextConfigPath}.bak`;
      fs.copyFileSync(config.nextConfigPath, backupPath);
      console.log(`Backup created at ${backupPath}`);
    }

    // Write the optimized config
    fs.writeFileSync(config.nextConfigPath, optimizedConfig);
    console.log(`Optimized Next.js config written to ${config.nextConfigPath}`);

    return true;
  } catch (error) {
    console.error(`Error writing optimized config: ${error.message}`);
    return false;
  }
}

// Function to check and install required dependencies
function checkAndInstallDependencies() {
  const requiredDeps = [
    'webpack-bundle-analyzer',
    'css-minimizer-webpack-plugin',
  ];

  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.error('package.json not found');
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const missingDeps = requiredDeps.filter(dep => !allDeps[dep]);

  if (missingDeps.length > 0) {
    console.log(`Missing dependencies: ${missingDeps.join(', ')}`);
    console.log('Please install them with:');
    console.log(`npm install --save-dev ${missingDeps.join(' ')}`);
    return false;
  }

  return true;
}

// Main function
function optimizeNextJsConfig() {
  console.log('Optimizing Next.js configuration...');

  // Check dependencies
  const depsOk = checkAndInstallDependencies();
  if (!depsOk) {
    console.log('Please install the required dependencies and run this script again.');
    return;
  }

  // Read current config
  const currentConfig = readNextConfig();

  // Generate optimized config
  const optimizedConfig = generateOptimizedConfig(currentConfig);

  // Write optimized config
  const success = writeOptimizedConfig(optimizedConfig);

  if (success) {
    console.log('\nNext.js configuration has been optimized for better performance!');
    console.log('The following optimizations have been applied:');
    console.log('- Image optimization with WebP and AVIF support');
    console.log('- Console removal in production (except errors and warnings)');
    console.log('- CSS optimization');
    console.log('- Package imports optimization for large libraries');
    console.log('- Server components and actions enabled');
    console.log('- Production source maps disabled');
    console.log('- Compression enabled');
    console.log('- Bundle analyzer added for production builds');
    console.log('- Font optimization enabled');
    console.log('- SWC minification enabled');
    console.log('\nPlease rebuild your application to apply these changes.');
  }
}

// Run the optimization
optimizeNextJsConfig(); 