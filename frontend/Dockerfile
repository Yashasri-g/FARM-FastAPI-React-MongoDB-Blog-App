FROM node:18-alpine

WORKDIR /app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY frontend/package.json frontend/package-lock.json /app/
RUN npm ci

COPY frontend /app

EXPOSE 3000

CMD ["npm", "start"]