#!/usr/bin/env node

/**
 * Enhanced development script with improved Hot Module Replacement
 * This script starts Next.js with optimized HMR settings for faster refresh
 */

const { spawn } = require('child_process');
const path = require('path');

// Set environment variables to enhance HMR
process.env.NODE_ENV = 'development';
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.NEXT_HMR_POLLING_INTERVAL = '300'; // Faster polling for file changes
process.env.NEXT_FAST_REFRESH = 'true';
process.env.NEXT_WEBPACK_LOGGING = 'verbose'; // More detailed webpack logs

// Increase memory limit for Node.js
process.env.NODE_OPTIONS = '--max-old-space-size=4096';

console.log('🔥 Starting Next.js with enhanced Hot Module Replacement...');

// Start Next.js dev server with custom options
const nextDev = spawn('next', ['dev', '--turbo'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    // Additional environment variables can be added here
  }
});

// Handle process exit
nextDev.on('close', (code) => {
  if (code !== 0) {
    console.log(`❌ Next.js dev server exited with code ${code}`);
    process.exit(code);
  }
});

// Handle process errors
nextDev.on('error', (err) => {
  console.error('❌ Failed to start Next.js dev server:', err);
  process.exit(1);
});

// Handle SIGINT (Ctrl+C) to gracefully shut down
process.on('SIGINT', () => {
  console.log('👋 Shutting down Next.js dev server...');
  nextDev.kill('SIGINT');
}); 