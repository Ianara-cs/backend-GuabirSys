# Etapa 1: build da aplicação
FROM node:20-alpine3.20 AS builder


WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Gera Prisma Client antes da build do NestJS
RUN npx prisma generate

RUN npm run build

# Etapa 2: imagem de produção
FROM node:20-alpine3.20 AS production

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Garante que o Prisma Client existe na imagem final
RUN npx prisma generate

ENV NODE_ENV=production
EXPOSE 3000

# Gera Prisma Client e aplica migrações apenas na hora da execução (quando DATABASE_URL estará disponível)
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node dist/main"]
