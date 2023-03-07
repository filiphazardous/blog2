FROM node:18-bullseye-slim
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./backend/app/package.json ./backend/app/package-lock.json ./backend/app/tsconfig.json ./backend/app/favicon.png ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm ci
WORKDIR /opt/app
COPY ./backend/app/ .
RUN npm run build
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "run", "start"]
