FROM node:24
WORKDIR /app
COPY . .
RUN npm install --omit=dev
EXPOSE 3001
CMD ["node","server.ts"]