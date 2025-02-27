#!/bin/bash

# Print current directory for debugging
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Verify the output directory
echo "Verifying output directory..."
ls -la out/

echo "Build completed successfully!" 