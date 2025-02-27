#!/bin/bash

# Exit on error
set -e

# Display current date and time
echo "Starting deployment at $(date)"

# Check if we're on the main branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "⚠️ Warning: You're not on the main branch. Current branch: $CURRENT_BRANCH"
  read -p "Do you want to continue with deployment? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment aborted."
    exit 1
  fi
fi

# Make sure we have the latest code
echo "📥 Pulling latest changes from remote..."
git pull origin $CURRENT_BRANCH

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linter..."
npm run lint

# Fetch Instagram data
echo "📸 Fetching Instagram data..."
npm run fetch-instagram

# Optimize images
echo "🖼️ Optimizing images..."
npm run optimize-images

# Build the project
echo "🏗️ Building the project..."
npm run build

# Run tests (optional)
if [ "$1" != "--skip-tests" ]; then
  echo "🧪 Running tests..."
  npm test
fi

# Deploy to Netlify
echo "🚀 Deploying to Netlify..."
if [ -x "$(command -v netlify)" ]; then
  # If Netlify CLI is installed
  netlify deploy --prod --dir=out
else
  echo "⚠️ Netlify CLI not found. Please install it with: npm install -g netlify-cli"
  echo "Then run: netlify deploy --prod --dir=out"
fi

# Notify about deployment
echo "✅ Deployment completed at $(date)"

# Open the site in browser (optional)
if [ "$2" == "--open" ]; then
  echo "🌐 Opening site in browser..."
  if [ "$(uname)" == "Darwin" ]; then
    # macOS
    open https://hdtradeservices.com.au
  elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    # Linux
    xdg-open https://hdtradeservices.com.au
  elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ] || [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
    # Windows
    start https://hdtradeservices.com.au
  fi
fi

echo "
🎉 Deployment process completed!
   Site: https://hdtradeservices.com.au
   
   Usage:
   ./scripts/deploy.sh             # Full deployment with tests
   ./scripts/deploy.sh --skip-tests # Skip tests
   ./scripts/deploy.sh --skip-tests --open # Skip tests and open site in browser
" 