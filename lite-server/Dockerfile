FROM node:20
WORKDIR /lite-server
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]

# FROM node:14

# WORKDIR /bezkoder-app
# COPY package.json .
# RUN npm install
# COPY . .
# CMD npm start