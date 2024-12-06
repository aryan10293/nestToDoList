###################
# The Build Stage
###################

FROM node:20-alpine AS build
# Docker working dir for Nest.js
WORKDIR /app
# Copy both .json files
# The * lets package-lock.json and package.json get copied
COPY package*.json .
## Install the packages on your package.json file
RUN npm install
# Copy over all the Nest.js source code
COPY . .
# Create the build
RUN npm run build

###################
# The Production Stage
###################

FROM node:20-alpine AS prod
# Setting up the production space
WORKDIR /app
COPY package*.json .
# Only run dependencies need for production
RUN npm install --only=production
# Copy dist from the build stage
COPY --from=build /app/dist  ./dist
# State the port you need Nest.js to use
ENV PORT=3000
EXPOSE ${PORT}
# Command to run Nest.js on Docker
CMD ["npm","run", "start:prod"]