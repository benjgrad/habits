FROM node:lts-alpine

# set the working direction
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN chown -R node:node ./

# Fix permissions for packages
# RUN npm config set unsafe-perm true
COPY . ./

RUN npm install
RUN npm install -g serve

RUN mkdir -p /app/dist
RUN chown -R node:node /app/dist
# Bundle app source

# RUN chown -R node:node /app/node_modules

EXPOSE 5173

# CMD ["sleep", "infinity"]
# # Production
RUN ["npm", "run", "build"]
CMD ["npm", "run", "serve"]

# Dev
# CMD ["npm", "run", "dev"]