# Simple test-project for Strapi/Vue combo

## Create the dev environment

- Install docker
- Create a strapi project to get the env variables
- Copy the `docker-compose.env.example.yml` file to `docker-compose.env.yml` and fill in the env variables

## Run the dev environment
- Run `npm run dev` in the project root

Note: The logs will show a couple of failed attempts to start, this is
because strapi isn't able to start until mariadb accepts connections.
This is not a problem, the strapi instance will just try to start over
and over until the database is available.
