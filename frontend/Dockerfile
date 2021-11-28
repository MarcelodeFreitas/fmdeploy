FROM node:16

ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN npm install

WORKDIR /fmdeploy
ADD . /fmdeploy

EXPOSE 3000

CMD ["npm", "start"]