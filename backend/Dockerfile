FROM node:10.13-alpine as dist
WORKDIR /tmp/
COPY package.json yarn.lock tsconfig.json tsconfig.build.json ./
COPY src/ src/
RUN apk --no-cache add --virtual \
      builds-deps \
      build-base \
      python
RUN yarn
RUN yarn build

FROM node:carbon-alpine as node_modules
WORKDIR /tmp/
COPY package.json yarn.lock ./
RUN apk --no-cache add --virtual \
      builds-deps \
      build-base \
      python
RUN yarn --production

FROM node:carbon-alpine
WORKDIR /usr/local/ban-notifier
COPY --from=node_modules /tmp/node_modules ./node_modules
COPY --from=dist /tmp/dist ./dist
COPY package.json ./package.json
CMD ["node", "dist/main.js"]