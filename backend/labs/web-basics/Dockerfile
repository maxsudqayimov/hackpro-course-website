FROM node:24-alpine
WORKDIR /app
COPY index.html server.mjs scenarios.mjs ./
RUN chown -R node:node /app
USER node
EXPOSE 8080
CMD ["node", "server.mjs"]
