FROM node:16-alpine AS dev
WORKDIR /app
ENV NODE_ENV development

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]


FROM node:16 AS builder
ENV NODE_ENV production

WORKDIR /app

COPY --from=dev /app /app

RUN yarn build


FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]