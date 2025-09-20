#!/bin/bash
set -e

# Debug: Check if DATABASE_URL is set
echo "DATABASE_URL is: ${DATABASE_URL:0:20}..." # Only show first 20 chars for security

# Run database migrations
npm run db:deploy

# Seed database with initial data
npx prisma db seed

# Debug: Check if dist directory exists and what's in it
echo "Checking dist directory:"
ls -la dist/ || echo "dist directory not found"

# Debug: Check if main.js exists
if [ -f "dist/main.js" ]; then
    echo "main.js found in dist/"
else
    echo "main.js NOT found in dist/"
    echo "Contents of dist:"
    find dist/ -name "*.js" | head -10 || echo "No JS files found"
fi

# Debug: Check what's listening on port 3000 before starting
echo "Checking what's on port 3000 before starting:"
netstat -tlnp | grep :3000 || echo "Nothing listening on port 3000"

# Start server - use development mode for now since production build might be missing
echo "Starting NestJS server..."
npm run start:dev &

# Wait a moment for the server to start
sleep 5

# Debug: Check what's listening on port 3000 after starting
echo "Checking what's on port 3000 after starting:"
netstat -tlnp | grep :3000 || echo "Nothing listening on port 3000"

# Debug: Test the API from inside the container
echo "Testing API from inside container:"
curl -s http://localhost:3000/api/v1/health || echo "API not responding"
curl -s http://0.0.0.0:3000/api/v1/health || echo "API not responding on 0.0.0.0"

# Keep the container running
wait