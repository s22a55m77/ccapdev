FROM node:lts-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add git

RUN npm i -g pnpm@latest
RUN pnpm i

COPY . .

USER node

FROM node:lts-alpine As build

WORKDIR /usr/src/app

COPY package*.json ./

COPY --from=development /usr/src/app/node_modules ./node_modules

COPY . .

RUN npm i -g pnpm@latest
RUN pnpm run build

ENV NODE_ENV production

RUN apk add git

RUN npm i -g pnpm@latest
RUN pnpm i --production && pnpm store prune

USER node

FROM node:lts-alpine As production

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
