#!/bin/bash

# Print debugging information
echo "===== BUILD ENVIRONMENT INFORMATION ====="
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "========================================"

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Ensure the output directory exists
if [ -d "out" ]; then
  echo "Build successful: 'out' directory exists"
  echo "Contents of 'out' directory:"
  ls -la out
else
  echo "Error: 'out' directory does not exist after build"
  echo "Current directory contents:"
  ls -la
  exit 1
fi 