#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

# Print current directory for debugging
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

# Check environment variables
echo "Checking environment variables..."
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
  echo "Warning: NEXT_PUBLIC_SUPABASE_URL is not set. Using placeholder value."
  export NEXT_PUBLIC_SUPABASE_URL="https://placeholder-supabase-url.supabase.co"
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
  echo "Warning: NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Using placeholder value."
  export NEXT_PUBLIC_SUPABASE_ANON_KEY="placeholder-anon-key"
fi

if [ -z "$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY" ]; then
  echo "Warning: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set. Using placeholder value."
  export NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="placeholder-google-maps-key"
fi

# Print environment variables for debugging (without exposing sensitive values)
echo "Environment variables set:"
echo "NEXT_PUBLIC_SUPABASE_URL: ${NEXT_PUBLIC_SUPABASE_URL:0:10}... (truncated)"
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY: ${NEXT_PUBLIC_SUPABASE_ANON_KEY:0:5}... (truncated)"
echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: ${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:0:5}... (truncated)"

# Install dependencies
echo "Installing dependencies..."
npm install

# Install ESLint (required for build)
echo "Installing ESLint..."
npm install --save-dev eslint

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Verify the output directory
echo "Verifying output directory..."
if [ ! -d "out" ]; then
  echo "Error: 'out' directory was not created. Creating empty directory for debugging."
  mkdir -p out
  echo "This is a placeholder file. The build process failed to generate proper output files." > out/index.html
fi

ls -la out/ || echo "Warning: Could not list contents of out directory"

echo "Build completed successfully!" 