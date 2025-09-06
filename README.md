# Smart CV Builder Backend

Smart CV Builder Backend API

## Tech Stack

- **Framework**: NestJS (Node.js + TypeScript)
- **Database**: PostgreSQL with Prisma ORM
- **Feature Flags**: Unleash

## Prerequisites

- Node.js 20+ and npm
- Docker & Docker Compose (recommended)

## Quick Start

### Development Setup

```bash
# Clone the repository
git clone https://github.com/integral-x/smart-cv-builder-backend.git
cd smart-cv-builder-backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start the application in development mode
./start.sh

# To stop all services
./stop.sh
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

## Feature Flags

This project uses [Unleash](https://unleash.mahiuddinalkamal.com) for feature flag management.

See [developer guide](./UNLEASH_DEV_GUIDE.md) for documentation.

## Environment Variables

See `.env.example` for available environment variables. Copy the file to `.env` and update the values as needed.

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

Copyright (c) 2025 Smart CV Builder.
