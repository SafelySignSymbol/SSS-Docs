# SSS-Docs

docker-compose.yml

```yml
version: "3.7"
services:
  front:
    image: node:17
    ports:
      - "3000:3000"
    volumes:
      - ./front:/home/node/app
    working_dir: /home/node/app
    environment:
      - NODE_ENV=development
    stdin_open: true
    command: yarn start
```
