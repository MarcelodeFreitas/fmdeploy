Website user
Name: Marcelo
Email: marcelo@gmail.com
Password: 6#4*W9YjdcauoG

don't forget to add folder: "for_testing" to the server

change ports in docker-compose-traefik.prod.yml and traefik.prod.toml

server.js: to update the backend api url

main.py: add frontend URL to CORS

Docker commands:
docker-compose -f docker-compose-traefik.prod.yml up -d --build
docker-compose -f docker-compose-traefik.prod.yml down