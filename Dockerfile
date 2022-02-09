FROM node:16-alpine

ENV NODE_ENV production
ENV PORT 8080

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only-prod
COPY newrelic.js ./newrelic.js
COPY src ./src
CMD ["npm", "start"]
