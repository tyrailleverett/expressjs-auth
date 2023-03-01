FROM node:19-alpine AS build
WORKDIR /usr/app
COPY package.json .
RUN npm i -g pnpm
RUN pnpm i
COPY . .
RUN pnpm build

FROM node:19-alpine AS production
WORKDIR /usr/app
COPY package.json .
RUN npm i -g pnpm
RUN pnpm i -P
COPY --from=build /usr/app/dist ./dist
RUN rm -f ./dist/db/knexfile.ts ./dist/db/db.ts
COPY ./src/db/ ./dist/db/

CMD ["pnpm", "start:prod"]
USER node