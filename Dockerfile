#build stage 
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


#prod stage

FROM node:18-alpine

WORKDIR /app

ARG NODE_ENV=production


COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

COPY . .

RUN npm install --only=production

RUN rm package*.json

EXPOSE 3000

CMD ["node", "dist/main.js"]
