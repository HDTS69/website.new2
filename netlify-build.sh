#!/bin/bash

# Print current directory for debugging
echo "Current directory: $(pwd)"

# Install dependencies
npm install

# Build the Next.js application
npm run build

# Ensure the output directory exists
if [ -d "out" ]; then
  echo "Build successful: 'out' directory exists"
else
  echo "Error: 'out' directory does not exist after build"
  exit 1
fi 