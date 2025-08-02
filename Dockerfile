# Stage 1: Build the Vue.js app
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

ARG VUE_APP_STRIPE_PUBLIC_KEY=''
ARG VUE_APP_API_URL=''

COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:1.29.0-alpine

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

ENV VUE_APP_STRIPE_PUBLIC_KEY=''
ENV VUE_APP_API_URL=''


# # Copy custom entrypoint script
# COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

EXPOSE 80

# ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]