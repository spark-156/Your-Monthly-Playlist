# based upon https://nuxtjs.org/deployments/koyeb#dockerize-your-application

FROM node:lts as base
WORKDIR /usr/src/app
COPY package.json yarn.lock ./

FROM base as development
ENV HOST=0.0.0.0
ENV CHOKIDAR_USEPOLLING=true
ENV NODE_ENV=development
EXPOSE 3000
RUN yarn
CMD yarn dev

FROM base as build
ENV NODE_ENV=production
COPY . .
RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false
RUN yarn build
RUN rm -rf node_modules && \
  NODE_ENV=production yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

FROM node:lts as production
ENV HOST=0.0.0.0
EXPOSE 80
WORKDIR /usr/src/app
COPY --from=build /usr/src/app .
CMD yarn start