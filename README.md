# MediTrack-AI

Your AI health tracker.

## Features

- **Authentication**: JWT-based authentication using Passport.
- **Database**: PostgreSQL with Prisma ORM.
- **Feature Flags**: Unleash integration for feature flag management.
- **Health Check**: A dedicated health check endpoint.
- **Validation**: Validation pipes for incoming requests.
- **Security**: Helmet for security headers and CORS configuration.
- **Containerization**: Dockerized setup for easy development and deployment.

## Tech Stack

- **Framework**: NestJS (Node.js + TypeScript)
- **Database**: PostgreSQL with Prisma ORM
- **Feature Flags**: Unleash

## Prerequisites

- Node.js 18+ and npm
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

# Run database migrations
npm run db:migrate

# Start development server
npm run start:dev
```

### Docker Setup (Recommended)

```bash
# Start all services
docker-compose up -d

# Run migrations
docker-compose exec api npm run db:migrate

# View logs
docker-compose logs -f api
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

## Deployment

### Production Build

```bash
# Build application
npm run build

# Start production server
npm run start:prod
```

### Docker Production

```bash
# Build production image
docker build -t nestjs-boilerplate .

# Run with docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

## API Documentation

- **Swagger UI**: `http://localhost:3000/api/docs`
- **OpenAPI Spec**: `http://localhost:3000/api/docs-json`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

Copyright (c) 2025 @Integral-X.
