FROM node:24-alpine
WORKDIR /app
COPY package.json server.mjs runner.mjs store.mjs strategy.mjs ./
COPY web ./web
RUN mkdir /app/data && chown node:node /app/data
USER node
ENV JRA_BIND=0.0.0.0 PORT=8789 JRA_MODE=demo
EXPOSE 8789
CMD ["node","server.mjs"]
