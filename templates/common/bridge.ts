/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import * as http from 'http';

const mockRequest = {
  headers: {
    'x-forwarded-for': '127.0.0.1',
    host: '127.0.0.1',
    hostname: '127.0.0.1',
    'Content-Type': '',
    'Content-Length': 0,
  },
  method: 'GET',
  url: '/',
  socket: {
    remoteAddress: '127.0.0.1',
    remotePort: 3000,
  },
};
function mockHttp(req: any = {}) {
  const request = { ...mockRequest, ...req };
  const response = new http.ServerResponse(request);
  return {
    request,
    response,
  };
}
function mockExpressContext(req?: any) {
  const { request, response } = mockHttp(req);
  return { req: request, res: response };
}
function mockKoaContext(app: any, req?: any) {
  const { request, response } = mockHttp(req);
  // 使用 koa 的 createContext 方法创建一个 ctx
  const ctx = app.createContext(request, response);
  return ctx;
}
export async function getExpressApi(
  handleRequest: (req, res) => void,
  url: string,
) {
  const urlObj = new URL(url);
  const mockCtx = mockExpressContext({
    url: urlObj.pathname,
    path: urlObj.pathname,
    method: 'GET',
  });
  return new Promise((resolve, reject) => {
    const res: any = mockCtx.res;
    res.send = (body: any) => {
      res.body = body;
      res.json = () => JSON.parse(body);
      res.text = () => body;
      resolve(res);
    };
    handleRequest(mockCtx.req, mockCtx.res);
  });
}

export async function getKoaApi(koa: any, url: string) {
  const urlObj = new URL(url);
  const mockCtx = mockKoaContext(koa, {
    url: urlObj.pathname,
    path: urlObj.pathname,
    method: 'GET',
  });
  const compose = require('koa-compose');
  return new Promise((resolve, reject) => {
    const fn = compose([
      async (ctx: any, next: () => Promise<any>): Promise<void> => {
        try {
          await next();
          ctx.response.json = () => ctx.response.body;
          ctx.response.text = () => JSON.stringify(ctx.response.body);
          resolve(ctx.response);
        } catch (err) {
          reject(err);
        }
      },
      ...koa.middleware,
    ]);
    koa.handleRequest(mockCtx, fn);
  });
}

const path = require("path");
module.paths.push(path.resolve(__dirname, '../../'));
const requestHandler = require('render');

export function rootMiddleware(req, res, next) {
  if (req.url?.startsWith('/api')) {
    console.log(`api ${req.url} access`);
    return next();
  } else {
    console.log(`page ${req.url} access`);
    return requestHandler(req, res);
  }
}
