#!/bin/bash

echo "Killing all Next.js development servers..."

# Kill any process with "next dev" in the command
pkill -f "node.*next dev" || true

# Kill any process with "next" in the command
pkill -f "node.*next" || true

# Kill any process listening on port 3000 (typical Next.js port)
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9 2>/dev/null || true

# Kill any process listening on ports 3001-3010 (in case of multiple Next.js instances)
for port in {3001..3010}; do
  lsof -i :$port | grep LISTEN | awk '{print $2}' | xargs kill -9 2>/dev/null || true
done

# Kill any running dev.sh processes
pkill -f "dev.sh" || true

echo "All development servers have been terminated."
echo "You can now start a fresh server with './dev.sh'" 