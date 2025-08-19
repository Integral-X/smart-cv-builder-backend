FROM node:20 AS base

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN rm -rf node_modules package-lock.json && npm install

# Copy Prisma schema
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate
RUN ls -lR /app/node_modules/.prisma

# Copy source code
COPY . .

# Build application
RUN npm run build

# Explicitly set Prisma Query Engine path
ENV PRISMA_QUERY_ENGINE_LIBRARY="/app/node_modules/.prisma/client/libquery_engine-linux-arm64-openssl-3.0.x.so.node"

# Production stage
FROM base AS production

# Install dumb-init for proper signal handling
RUN apt-get update && apt-get install -y dumb-init openssl && rm -rf /var/lib/apt/lists/*

# Create app user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Switch to non-root user
USER nestjs

EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "dist/main.js"]
