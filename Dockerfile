# ----------------------
# 1️⃣ Build stage
# ----------------------
FROM node:20-bullseye AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --legacy-peer-deps

COPY . .
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npm run build

# ----------------------
# 2️⃣ Production stage
# ----------------------
FROM node:20-bullseye AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

RUN addgroup --system app && adduser --system --ingroup app app
USER app

EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy || echo '⚠️ Migration skipped/failure'; npm start"]
