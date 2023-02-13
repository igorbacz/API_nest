#build stage 
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


#prod stage

FROM node:18-alpine

WORKDIR /app

# ARG NODE_ENV=production

# ENV= NODE_ENV=${NODE_ENV}

COPY --from=build /app/dist ./dist

COPY package*.json ./

COPY . .

RUN npm install --only=production

RUN rm package*.json

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
