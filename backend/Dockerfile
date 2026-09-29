# ---------- Build stage: compile TypeScript ----------
FROM node:22-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---------- Runtime stage: only production deps + compiled JS ----------
FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist

USER node

# Render injects PORT at runtime; 8000 is the local default
ENV PORT=8000
EXPOSE 8000

CMD ["node", "dist/index.js"]
