FROM node:20.19 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

ARG VUE_APP_STRIPE_PUBLIC_KEY=""
ARG VUE_APP_API_URL=""

COPY . .

RUN npm run build

FROM nginx:1.29.0-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]