# 1. Adım: Node.js tabanlı alpine imajını kullan
FROM node:22-alpine3.19 as build

# Çalışma dizinini /app olarak ayarla
WORKDIR /app

# package.json ve package-lock.json'u kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install
RUN npm install -g serve

# Uygulama kodunu kopyala
COPY . .

# Uygulamayı build et
RUN npm run build

EXPOSE 3030

CMD [ "serve", "-s", "/app/dist", "-l", "3030" ]