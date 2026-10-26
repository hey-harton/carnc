# Vite 8 and @vitejs/plugin-react 6 require Node ^20.19.0 || >=22.12.0.
FROM node:24-alpine

WORKDIR /app

# Install dependencies first to maximize Docker layer caching.
# Include .npmrc (legacy-peer-deps=true) required for Carbon v10 + React 18 peer resolution.
COPY package*.json .npmrc* ./
RUN npm install --legacy-peer-deps

COPY . .

# Vite dev server port (see vite.config.mts).
EXPOSE 3000

CMD ["npm", "start"]