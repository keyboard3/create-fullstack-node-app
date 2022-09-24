//@ts-nocheck
import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as egg from '@midwayjs/web';
import { NextMiddleware } from './middleware/next-bridge.middleware';
import { getKoaApi } from './bridge';

@Configuration({
  imports: [egg],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {
    this.app.useMiddleware([NextMiddleware]);
    (global as any).serverFetch = getKoaApi.bind(
      this,
      this.app,
    );
  }
}