# Usa una imagen base oficial de Node
FROM node:lts

# Define el entorno por defecto
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# Crea el directorio de trabajo
WORKDIR /code

# Expone los puertos necesarios
ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT 9229 9230

# Copia solo los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Healthcheck para saber si el contenedor está corriendo correctamente
HEALTHCHECK --interval=30s CMD node healthcheck.js

# Comando de inicio
CMD ["node", "index.js"]
