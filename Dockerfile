FROM node:20

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apt-get update && apt-get install -y dumb-init openssl && rm -rf /var/lib/apt/lists/*

# Copy package files and install dependencies
COPY package*.json ./
RUN rm -rf node_modules package-lock.json && npm install

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source code
COPY . .

# Build application
RUN npm run build

# Verify build output exists
RUN ls -la dist/

# Make script executable
RUN chmod +x start-docker.sh

# Create app user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Change ownership of app directory to nestjs user
RUN chown -R nestjs:nodejs /app

# Switch to non-root user
USER nestjs

# Explicitly set Prisma Query Engine path
ENV PRISMA_QUERY_ENGINE_LIBRARY="/app/node_modules/.prisma/client/libquery_engine-linux-arm64-openssl-3.0.x.so.node"

EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

CMD ["./start-docker.sh"]
