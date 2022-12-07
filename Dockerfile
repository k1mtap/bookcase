# INSTALL IMAGE
FROM node:18 as intermediate

# from monorepo root
WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./tsconfig*.json ./
COPY ./core/book ./core/book
COPY ./core/util ./core/util
COPY ./backend/ ./backend/
COPY ./frontend/ ./frontend/

RUN npm install
RUN npm run build

# MAIN IMAGE
FROM node:18-alpine

ENV TZ=Europe/Helsinki
RUN apk update && apk add --no-cache \
  tzdata \
  && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
  && echo $TZ > /etc/timezone

WORKDIR /usr/src/app

COPY . .

COPY --from=intermediate /usr/src/app/ /usr/src/app/
COPY --from=intermediate /usr/src/app/frontend/dist/ /usr/src/app/backend/build

CMD [ "npm", "start" ]