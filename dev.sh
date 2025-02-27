#!/bin/bash

# Check if Next.js dev server is already running
if pgrep -f "next dev" > /dev/null; then
  echo "Next.js development server is already running."
  echo "Running servers on ports:"
  lsof -i -P | grep LISTEN | grep node | awk '{print $9}' | sed 's/.*://'
  
  # Get the first available port
  PORT=$(lsof -i -P | grep LISTEN | grep node | head -1 | awk '{print $9}' | sed 's/.*://')
  
  echo -e "\nOpen your browser at: http://localhost:$PORT"
else
  echo "Starting Next.js development server..."
  npm run dev
fi 