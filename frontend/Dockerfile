FROM node:lts AS development

ENV CI=true
ENV PORT=5173

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm install
COPY . /code

CMD [ "npm", "run", "dev"]

FROM development AS builder

RUN npm run build

FROM nginx:1.13-alpine

COPY --from=builder /code/build /usr/share/nginx/html
