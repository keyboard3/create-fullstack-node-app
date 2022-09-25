//@ts-nocheck
import { IMiddleware, NextFunction } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { Context } from 'egg';
import { rootMiddleware } from '../bridge';

@Middleware()
export class NextMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => rootMiddleware(ctx.req, ctx.res, next);
  }

  static getName(): string {
    return 'next';
  }
}
