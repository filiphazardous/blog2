FROM node:20-alpine
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ARG VITE_STRAPI_HOST=http://localhost
ENV VITE_STRAPI_HOST=$VITE_STRAPI_HOST
ARG VITE_STRAPI_PORT=1337
ENV VITE_STRAPI_PORT=$VITE_STRAPI_PORT
ARG BASE_URL=''
ENV BASE_URL=$BASE_URL

WORKDIR /opt/
COPY ./app/package.json ./app/package-lock.json ./app/tsconfig.json ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm ci
WORKDIR /opt/app
COPY ./app/ .
EXPOSE 4173
RUN npm run build-only
CMD ["npm", "run", "preview"]
