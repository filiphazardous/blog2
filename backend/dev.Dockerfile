FROM node:18-alpine
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./app/package.json ./app/package-lock.json ./app/tsconfig.json ./app/favicon.png ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm ci
WORKDIR /opt/app
COPY ./app/ .
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "develop"]
