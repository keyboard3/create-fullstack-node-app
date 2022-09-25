# This stage installs our modules
FROM mhart/alpine-node:14 AS deps
WORKDIR /app
COPY package.json yarn.lock ./
COPY server/package.json ./server/package.json
COPY render/package.json ./render/package.json
RUN yarn --frozen-lockfile

FROM mhart/alpine-node:14 AS serverdeps
WORKDIR /app
COPY package.json yarn.lock ./
COPY server/package.json ./server/package.json
COPY render/package.json ./render/package.json
RUN NODE_ENV=production yarn --frozen-lockfile

FROM deps AS renderbuilder
COPY render ./render
RUN npm run renderBuild

FROM deps AS serverbuilder
COPY server ./server
RUN npm run serverBuild

FROM serverdeps AS runner
COPY --from=renderbuilder /app/render/.next ./render/.next
COPY --from=renderbuilder /app/render/public ./render/public
COPY --from=renderbuilder /app/render/index.js ./render/index.js
COPY --from=serverbuilder /app/server/dist ./server/dist
COPY --from=serverbuilder /app/server/.production.env ./server/

ENV NODE_ENV=production
CMD ["npm","run","start"]