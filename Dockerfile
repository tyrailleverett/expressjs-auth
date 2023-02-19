FROM node:19-alpine AS build
WORKDIR /usr/src/app
COPY package.json .
RUN npm i -g pnpm
RUN pnpm i
COPY . .
RUN pnpm build

FROM node:19-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package.json .
RUN npm i -g pnpm
RUN pnpm i -P
COPY --from=build /usr/src/app/dist ./dist
COPY prisma ./prisma
RUN npx prisma generate
CMD ["node", "dist/index.js"]
USER node