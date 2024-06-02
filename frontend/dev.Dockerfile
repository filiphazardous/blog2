FROM node:20-alpine
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./app/package.json ./app/package-lock.json ./app/tsconfig.json ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm ci
WORKDIR /opt/app
COPY ./app/ .
EXPOSE 5173
CMD ["npm", "run", "dev"]
