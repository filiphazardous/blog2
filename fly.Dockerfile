FROM node:20-alpine as builder
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ARG PROD_STRAPI_HOST
ENV VITE_STRAPI_HOST=$PROD_STRAPI_HOST
ARG PROD_STRAPI_PORT=443
ENV VITE_STRAPI_PORT=$PROD_STRAPI_PORT
ARG VITE_STRAPI_API_KEY
ENV VITE_STRAPI_API_KEY=$VITE_STRAPI_API_KEY
ARG BASE_URL=''
ENV BASE_URL=$BASE_URL

WORKDIR /app/
COPY ./frontend/app/package.json ./frontend/app/package-lock.json ./frontend/app/tsconfig.json ./frontend/app/tsconfig.config.json ./
ENV PATH /app/node_modules/.bin:$PATH
RUN npm ci
WORKDIR /app
COPY ./frontend/app/ .
RUN npm run build-only

FROM node:20-bullseye-slim
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./backend/app/package.json ./backend/app/package-lock.json ./backend/app/tsconfig.json ./backend/app/favicon.png ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm ci
WORKDIR /opt/app
COPY ./backend/app/ .
RUN npm run build
COPY --from=builder /app/dist ./public
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "run", "start"]
