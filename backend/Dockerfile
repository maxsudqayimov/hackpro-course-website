FROM node:24-alpine

RUN apk add --no-cache docker-cli tini
WORKDIR /app
COPY package.json ./
COPY src ./src

RUN addgroup -S hackpro && adduser -S -G hackpro hackpro \
  && mkdir -p /data && chown -R hackpro:hackpro /app /data

USER hackpro
ENV NODE_ENV=production
EXPOSE 8787
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "src/api.mjs"]
