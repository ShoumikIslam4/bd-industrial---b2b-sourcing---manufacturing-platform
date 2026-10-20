# BD-Industrial B2B Platform - Multi-Stage Production Dockerfile
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy application source code
COPY . .

# Build application for production
RUN npm run build

# Production runtime stage
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Install minimal production packages
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# Copy build artifacts from builder stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/scripts ./scripts
COPY --from=build /app/docs ./docs

EXPOSE 3000

# Run preview server on port 3000 accessible from host
CMD ["npx", "vite", "preview", "--port=3000", "--host=0.0.0.0"]
