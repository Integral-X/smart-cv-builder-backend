#!/bin/bash
set -e

# Run database migrations
npm run db:deploy

# Seed database with initial data
npx prisma db seed

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