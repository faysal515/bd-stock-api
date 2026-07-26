# Stage 1: Build the application
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including devDependencies for tsc)
RUN npm ci

# Copy source code and configuration files (like tsconfig.json)
COPY . .

# Build the TypeScript project
RUN npx tsc

# Stage 2: Production environment
FROM node:22-alpine AS runner

WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json* ./

# Install production dependencies only to keep the image lightweight
RUN npm ci --only=production

# Copy compiled JavaScript from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Copy the static frontend so express.static('public') can serve index.html
COPY --from=builder /usr/src/app/public ./public

# Set required environment variables
ENV NODE_ENV=production
ENV PORT=4000
ENV DSE_BASE_URL="https://dsebd.org"

# Expose the application port
EXPOSE 4000

# Run the production server with the flag from your start script
CMD ["node", "--max-old-space-size=4096", "--enable-source-maps", "dist/src/app.js"]