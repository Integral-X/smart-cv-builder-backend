# MediTrack-AI

Your AI health tracker.

## Tech Stack

- **Framework**: NestJS (Node.js + TypeScript)
- **Database**: PostgreSQL with Prisma ORM
- **Feature Flags**: Unleash

## Prerequisites

- Node.js 20+ and npm
- PostgreSQL 14+
- Docker & Docker Compose (recommended)

## Quick Start

### Development Setup

```bash

# Clone the repository
git clone https://github.com/Integral-X/meditrack-backend.git
cd meditrack-backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start database services
docker-compose up -d postgres postgres_test

# Run database migrations
npm run db:migrate

# Seed database with initial data (e.g., admin user)
npx prisma db seed

# Start development server
npm run start:dev
```

## Project Structure

```
src/
├── app.module.ts           # Root application module
├── main.ts                 # Application entry point
├── common/                 # Shared utilities, guards, interceptors
│   ├── controllers/        # Common controllers (health checks)
│   ├── decorators/         # Custom decorators
│   ├── filters/            # Exception filters
│   ├── guards/             # Authentication & authorization guards
│   └── interceptors/       # Request/response interceptors
├── config/                 # Configuration modules & services
│   ├── app.config.ts       # Application configuration
│   ├── database.module.ts  # Database module setup
│   └── prisma.service.ts   # Prisma database service
├── modules/                # Domain-specific feature modules
│   ├── auth/               # Authentication & authorization
│   └── unleash/            # Unleash feature flag management
└── shared/                 # Shared DTOs, interfaces, types
    ├── dto/                # Data transfer objects
    └── interfaces/         # Common interfaces
```

## Environment Variables

See `.env.example` for available environment variables.

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

Copyright (c) 2025 @Integral-X.
