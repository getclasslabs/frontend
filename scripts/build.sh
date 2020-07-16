#!/bin/bash

echo "Compiling the Frontend"

cp ./package.json ./docker/

docker build -t getclass/frontend:$1 docker/

if [[ ! $(docker service ls | grep gcl_frontend) = "" ]]; then
  docker service update gcl_frontend --image getclass/frontend:$1
else
  docker stack deploy -c docker-compose.yaml gcl
fi