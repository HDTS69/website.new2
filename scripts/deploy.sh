#!/bin/bash

# Exit on error
set -e

# Display current date and time
echo "Starting deployment at $(date)"

# Check if we're on the main branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" = "main" ]; then
  echo "⚠️ Warning: You're on the main branch. Creating a deployment branch instead."
  DEPLOY_BRANCH="deploy-$(date +%Y%m%d-%H%M%S)"
  git checkout -b $DEPLOY_BRANCH
  echo "Created and switched to branch: $DEPLOY_BRANCH"
else
  DEPLOY_BRANCH=$CURRENT_BRANCH
  echo "Using current branch for deployment: $DEPLOY_BRANCH"
fi

# Make sure we have the latest code
echo "📥 Pulling latest changes from remote..."
git pull origin main --no-rebase

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linter..."
npm run lint

# Create data directory if it doesn't exist
echo "📁 Ensuring data directory exists..."
mkdir -p public/data

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

# Commit changes
echo "💾 Committing changes..."
git add public/data scripts/fetch-instagram.js
git commit -m "chore: Update Instagram data and deployment files" || echo "No changes to commit"

# Create a pull request instead of pushing directly
echo "🔄 Creating a pull request..."
if [ -x "$(command -v gh)" ]; then
  # If GitHub CLI is installed
  gh pr create --title "Deploy: $(date +%Y-%m-%d)" --body "Automated deployment PR created by deploy.sh script" || echo "PR creation skipped (may already exist)"
else
  echo "⚠️ GitHub CLI not found. Please install it with: npm install -g gh"
  echo "Then run: gh pr create --title \"Deploy: $(date +%Y-%m-%d)\" --body \"Automated deployment PR created by deploy.sh script\""
fi

# Deploy to Netlify (from the deployment branch)
echo "🚀 Deploying to Netlify..."
if [ -x "$(command -v netlify)" ]; then
  # If Netlify CLI is installed
  netlify deploy --build --dir=out
else
  echo "⚠️ Netlify CLI not found. Please install it with: npm install -g netlify-cli"
  echo "Then run: netlify deploy --build --dir=out"
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