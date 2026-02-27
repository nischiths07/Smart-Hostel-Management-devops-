# Stage 1: Build the React application
FROM node:20-alpine as build-stage

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install all dependencies (including dev deps to build)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve the production build with Nginx
FROM nginx:alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy only the compiled build from the first stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Port 80 for production
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
