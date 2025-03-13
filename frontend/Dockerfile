# Etapa 1: Construção do frontend
FROM node:18 AS builder
WORKDIR /app

# Copia os arquivos do projeto para dentro do contêiner
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servindo a aplicação com Nginx
FROM nginx:latest
WORKDIR /usr/share/nginx/html

# Remove os arquivos padrão do nginx e copia o build do React
RUN rm -rf ./*
COPY --from=builder /app/dist .

# Copia a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
