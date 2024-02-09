## LoadMatch - lite-server 

Initial setup node application.

        terminal cmd : npm init

        terminal cmd : npm i express pg sequelize cors body-parser morgan

Setting Up Express Web Server :

    - Root Folder -> index.js file.

    What we do here:
    – import express and cors,body-parser,morgan modules:

    - Express is for building the Rest apis
    - cors provides Express middleware to enable CORS with various options.

    terminal cmd : npm i express cors body-parser morgan 

Folder structure :

    - app
        - models
        - controllers
        - routes
        - utils 
            - db connection
        - index.js - startup file


Dockerization :

With DockerFile and Node Application :

    To build we need a Dockerfile :

        create Dockerfile

            FROM node:21
            WORKDIR /app
            COPY package.json package*.json ./
            RUN npm install
            COPY . .
            EXPOSE 3001

        terminal cmd : docker image build -t lite-server:0.0.1 .


    Checkout images and containers build :

            terminal cmd : docker images -> to look at all images
            terminal cmd : docker ps -> to look at all running containers
            terminal cmd : docker ps -a -> to look at all containers
            terminal cmd : docker rm c4 29 -> to remove specific containers
            terminal cmd : docker rm -f c4 29 -> to remove forced specific containers


    Running the docker image on Container :

            terminal cmd : docker run -p 3001:3001 lite-server:0.0.1

    What is Advantages of dockerization?

            lets Try to look into it :
            Try deleting node_modules in local
            then build image and run the container



With Docker-Composer and Node Application and Postgres :

To build docker-compose.yml :

        version: '3.8'

        services:

            node_app:
            container_name: lite-server
            image: lite-server:0.0.2
            build: 
                context: .
            ports:
                - "3001:3001"
            environment:
                - EXTERNAL_PORT=3001

To Build node application image
        
        cmd : docker compose build

        No need to -t -p portmapping it just reads docker compose file

To Run the container :

        cmd : docker compose up
            
.dockerignore