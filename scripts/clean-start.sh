#!/bin/bash

# Clean Next.js cache script
# This script helps prevent hydration mismatches and module not found errors

echo "🧹 Cleaning Next.js cache..."
# Remove the entire .next directory
rm -rf .next
# Remove node_modules cache
rm -rf node_modules/.cache

# Kill any running Next.js processes
echo "🔄 Killing any running Next.js processes..."
pkill -f "node.*next" || true

echo "🔄 Clearing npm cache..."
npm cache clean --force

# Remove package-lock.json and reinstall dependencies if needed
if [ "$1" == "--full" ]; then
  echo "🔄 Performing full cleanup (removing package-lock.json and node_modules)..."
  rm -f package-lock.json
  rm -rf node_modules
  npm install
fi

echo "✅ Cache cleaned successfully!"

echo "🚀 Starting development server..."
# Use NODE_OPTIONS to increase memory limit and disable experimental warnings
export NODE_OPTIONS="--max-old-space-size=4096 --no-warnings"
npm run dev 