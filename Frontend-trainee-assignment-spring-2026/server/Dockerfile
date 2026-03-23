FROM node:20-slim

WORKDIR /app
COPY package.json ./
RUN npm install --ignore-scripts && npx esbuild --version || true
COPY . .
EXPOSE 8080
CMD ["npx", "tsx", "server.ts"]
