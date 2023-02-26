FROM node:18-bullseye-slim
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./app/package.json ./app/package-lock.json ./app/tsconfig.json ./app/favicon.png ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm ci
WORKDIR /opt/app
COPY ./app/ .
RUN npm run build
EXPOSE 1337
RUN apt update && apt install wget -y
CMD ["npm", "run", "start"]
