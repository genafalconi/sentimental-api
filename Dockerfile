# Base image.
FROM node:20-alpine

# Set the Environment to production
ENV NODE_ENV production

# Set default values for build arguments
ARG GOOGLE_CLOUD_SENTIMENTAL_API_KEY
ARG MONGO_DB
ARG APP_PORT

# Set environment variables
ENV GOOGLE_CLOUD_SENTIMENTAL_API_KEY=$GOOGLE_CLOUD_SENTIMENTAL_API_KEY
ENV MONGO_DB=$MONGO_DB
ENV APP_PORT=$APP_PORT

# Create app directory.
WORKDIR /usr/src/app

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the production build
CMD ["npm", "run", "start:prod"]