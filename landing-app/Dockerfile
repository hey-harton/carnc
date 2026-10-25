# Vite 8 and @vitejs/plugin-react 6 require Node ^20.19.0 || >=22.12.0.
FROM node:24-alpine

WORKDIR /app

# Install dependencies first to maximize Docker layer caching.
COPY package*.json ./
RUN npm install

COPY . .

# Vite dev server port (see vite.config.mts).
EXPOSE 3000

CMD ["npm", "start"]