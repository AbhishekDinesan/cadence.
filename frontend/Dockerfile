
FROM node:16 AS build

WORKDIR /app
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend/ /app/
EXPOSE 3000
CMD ["npm", "start"]
