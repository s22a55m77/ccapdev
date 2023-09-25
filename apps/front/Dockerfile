FROM node:lts-alpine

WORKDIR /usr/src/app/

RUN npm i -g pnpm

USER root

COPY package.json ./

RUN pnpm i

COPY . ./

EXPOSE 5173

CMD ["pnpm", "run", "dev:mock", "--host"]
