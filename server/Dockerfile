FROM node:16-alpine

WORKDIR /server

COPY ./index.js .
COPY ./package.json .
COPY ./pnpm-lock.yaml .

RUN npm install -g pnpm
RUN pnpm install --prod

EXPOSE 8080
CMD node index.js