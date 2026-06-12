# =========================
#        BUILD STAGE
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# dépendances
COPY package*.json ./
RUN npm ci

# code source
COPY . .

# Prisma generate (OBLIGATOIRE avant build Next)
RUN npx prisma generate

# build Next.js (standalone)
RUN npm run build


# =========================
#        RUN STAGE
# =========================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Installer uniquement les deps prod (nécessaire pour Prisma runtime)
COPY package*.json ./
RUN npm ci --omit=dev

# Next standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Prisma (schema + migrations + seed si existant)
COPY --from=builder /app/prisma ./prisma

# Prisma client généré
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# SQLite data folder (IMPORTANT)
RUN mkdir -p /app/data

VOLUME ["/app/data"]

EXPOSE 3000

CMD ["node", "server.js"]