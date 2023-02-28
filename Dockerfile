FROM node:19-alpine AS build
WORKDIR /usr/src/app
COPY package.json .
RUN npm i -g pnpm
RUN pnpm i
COPY . .
RUN pnpm build

FROM node:19-alpine AS production
WORKDIR /usr/src/app
COPY package.json .
RUN npm i -g pnpm
RUN pnpm i -P
COPY --from=build /usr/src/app/dist ./dist
CMD ["pnpm", "start:prod"]
USER node