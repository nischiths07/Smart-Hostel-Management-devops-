# Use Node.js LTS
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# Bundle app source
COPY . .

# Create uploads directory for image storage
RUN mkdir -p uploads

# The backend runs on port 5000
EXPOSE 5000

# Start the server
CMD [ "npm", "start" ]
