NOTES FOR ME:

Domain name: mivbox.di.uminho.pt
- don't forget to replace localhost with domain name

Important files:
- ml_deploy/fmdeploy/backend/main.py
    - add frontend URL to CORS
- ml_deploy/fmdeploy/frontend/components/server/server.js
    - frontend file where backend aapi url is saved
- ml_deploy/fmdeploy/traefik.prod.toml
    - email for lets encrypt certificates: fmdeploy@gmail.com

Container paths:
- docker instructions readme: ml_deploy/fmdeploy/docker_readme.txt
- docker compose file: ml_deploy/fmdeploy/docker-compose-traefik.prod.yml

Docker commands:
docker-compose -f docker-compose-traefik.prod.yml up -d --build
docker-compose -f docker-compose-traefik.prod.yml down

Docker flags:
-f or --file Specify an alternate compose file (default: docker-compose.yml)
-d enable debug mode
____________________________________________________________________________

TEST INSTRUCTIONS:

Container number: 36079
Container link: https://mivbox.di.uminho.pt:36079

Container paths:
- docker instructions readme (this file): ml_deploy/fmdeploy/docker_readme.txt
- docker compose file: ml_deploy/fmdeploy/docker-compose-traefik.prod.yml

1. navigate to directory: ml_deploy/fmdeploy

2. run command to start the new docker container: 
docker-compose -f docker-compose-traefik.prod.yml up -d --build

3. test if the following URLs are operational:
    3.1 frontend: https://fmdeploy.mivbox.di.uminho.pt
    3.2 backend/api: https://fmdeploy-api.mivbox.di.uminho.pt
    
4. please write errors here:
    -



 
5. run command to stop container or command to stop and remove:
    - stop: docker-compose -f docker-compose-traefik.prod.yml stop
    - stop and remove: docker-compose -f docker-compose-traefik.prod.yml down