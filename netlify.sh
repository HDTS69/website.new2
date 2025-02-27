#!/bin/bash

# This is a simple script that Netlify can use as an alternative build command
# It will run the build process from the correct directory

# Print debugging information
echo "===== NETLIFY ENVIRONMENT INFORMATION ====="
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "========================================"

# Check if we're in the correct directory
if [ -f "package.json" ]; then
  echo "Found package.json in current directory, proceeding with build"
else
  echo "No package.json found in current directory"
  
  # Try to find the correct directory
  if [ -d "website.new" ]; then
    echo "Found website.new directory, changing to it"
    cd website.new
  fi
  
  if [ -f "package.json" ]; then
    echo "Found package.json after directory change, proceeding with build"
  else
    echo "Still no package.json found, listing all directories:"
    find . -type d -maxdepth 2
    exit 1
  fi
fi

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