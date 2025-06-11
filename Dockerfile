# stage 1

FROM node:22-alpine AS base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm ci

# stage 2

FROM base AS development

ENV NODE_ENV=development
COPY . . 
RUN npx prisma generate
CMD ["npm", "run", "dev"]


# stage 3

FROM base AS builder

COPY . .
RUN npx prisma generate
RUN npm run build
RUN npm prune --omit=dev && npm cache clean --force

# stage 4

FROM builder AS production

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

CMD ["npm", "run", "start"]