#!/bin/bash

# Kill any existing Next.js development servers
echo "Stopping any existing Next.js servers..."
pkill -f "node.*next dev" || true

# Wait a moment to ensure ports are released
sleep 2

# Start the development server with default Fast Refresh (built into Next.js)
echo "Starting Next.js development server with Fast Refresh..."
npm run dev 