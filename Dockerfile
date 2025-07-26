# Usa uma imagem base do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Expõe a porta usada pela aplicação (mude se necessário)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
