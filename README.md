# Pixieblog
A simple test-project for Strapi/Vue combo

## Create the dev environment

- Install docker
- Create a strapi project to get the env variables
- Copy the `.env.example` file to `.env` and fill in the env variables

## Run the dev environment
- Run `npm run dev` in the project root

## Test the prod environment
- Run `npm run prod` in the project root

## Other docker related stuff
- `npm run logs` will output the logs
- `npm run stop` will stop the environments

## Rebuild some aspect of the environment
If you need to trigger a docker image rebuild, eg because you changed
the package.json file, this can be done with `npm run rebuild:vue` 
(or  strapi or mariadb). If you want to rebuild all images, that's as
easy as `npm run rebuild`

## Deploy to fly.io
Currently it's a manual deploy:  
`fly deploy --build-arg PROD_STRAPI_HOST=https://your.hostname --build-arg VITE_STRAPI_API_KEY=the-key`

First time you try to build, set PROD_STRAPI_HOST to `http://localhost:1337` and
make sure you have your local strapi-host running.
