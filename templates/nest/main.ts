//@ts-nocheck
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getExpressApi, rootMiddleware } from 'fullstack-helper';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    rootMiddleware.bind(this, '/api', path.join(__dirname, '../../render')),
  );
  (global as any).serverFetch = getExpressApi.bind(
    this,
    app.getHttpAdapter().getInstance(),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();