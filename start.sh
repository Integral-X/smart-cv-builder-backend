#!/bin/bash
set -e

# Start database services
docker-compose up -d postgres postgres_test

# Run database migrations
npm run db:migrate

# Seed database with initial data (e.g., admin user)
npx prisma db seed

# Start development server
npm run start:dev