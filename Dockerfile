# Stage 1: Base image with essential tools
FROM node:22-alpine AS base
WORKDIR /app

# Stage 2: Install dependencies
# This stage is used as a cache for both dev and prod
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm install

# Stage 3: Builder for production
# This stage builds the application for production
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
# Omitting dev dependencies in the build step is good practice
RUN npm run build

# Stage 4: Development environment
# This stage is for running the app in development mode
FROM base AS development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
# Expose the port Next.js runs on
EXPOSE 3000
# Start the development server with hot-reloading
CMD ["npm", "run", "dev"]

# Stage 5: Production environment
# This is the final, lean production image
FROM base AS production
ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Start the optimized Next.js server
CMD ["node", "server.js"]