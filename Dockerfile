# =========================
#        BUILD STAGE
# =========================
FROM node:20-bullseye AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Prisma generate
RUN npx prisma generate

# Build Next.js
RUN npm run build


# =========================
#        RUN STAGE
# =========================
FROM node:20-bullseye AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# OpenSSL + Prisma runtime dependencies (IMPORTANT)
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --omit=dev

# Next standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Prisma
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# SQLite folder
RUN mkdir -p /app/data
VOLUME ["/app/data"]

EXPOSE 3000

CMD ["node", "server.js"]