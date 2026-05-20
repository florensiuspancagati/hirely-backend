FROM node:22-alpine

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Environment
ENV NODE_ENV=production

# Hugging Face menggunakan PORT otomatis
ENV HOST=0.0.0.0
ENV PORT=7860

# Expose port
EXPOSE 7860

# Start app
CMD ["node", "./src/server.js"]