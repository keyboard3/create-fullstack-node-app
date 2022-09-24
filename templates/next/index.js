const next = require('next').default;
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const basePath = process.env.BASE_PATH || '';

const app = next({
  dev,
  hostname,
  port,
  dir: '../render',
  conf: { basePath, typescript: { ignoreBuildErrors: true } },
});
app.prepare();
const requestHandler = app.getRequestHandler();
module.exports = requestHandler;