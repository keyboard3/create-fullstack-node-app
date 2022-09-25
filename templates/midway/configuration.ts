//@ts-nocheck
import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import { ReportMiddleware } from './middleware/report.middleware';
import { NextMiddleware } from './middleware/next-bridge.middleware';
import { getKoaApi } from './bridge';

@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    this.app.useMiddleware([NextMiddleware, ReportMiddleware]);
    (global as any).serverFetch = getKoaApi.bind(
      this,
      this.app,
    );
  }
}