# =====================================
# STAGE 1: Build
# =====================================
FROM node:20.20.1-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias (incluye devDependencies para build)
RUN npm ci

# Copiar código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# =====================================
# STAGE 2: Production
# =====================================
FROM node:20.20.1-alpine AS production

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar SOLO dependencias de producción
RUN npm ci --omit=dev && npm cache clean --force

# Copiar build desde stage anterior
COPY --from=builder /app/dist ./dist

# Exponer puerto
EXPOSE 3000

# Usuario no-root (seguridad)
USER node

# Comando de inicio
CMD ["node", "dist/main.js"]