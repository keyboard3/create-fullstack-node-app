//@ts-nocheck
import { IMiddleware, NextFunction } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { Context } from 'egg';
import { rootMiddleware } from 'fullstack-helper';
import * as path from 'path';

@Middleware()
export class NextMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => rootMiddleware.bind(this, '/api', path.join(__dirname, '../../../render'))(ctx.req, ctx.res, next);
  }

  static getName(): string {
    return 'next';
  }
}
