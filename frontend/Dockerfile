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

# Stage 2: Serve the production build with Node
FROM node:20-alpine

WORKDIR /app

# Install a simple static file server
RUN npm install -g serve

# Copy only the compiled build from the first stage
COPY --from=build-stage /app/dist ./dist

# Frontend production port
EXPOSE 5173

# Serve the 'dist' directory on port 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
