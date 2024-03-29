import { NestFactory } from '@nestjs/core';
import AppModule from './modules/AppModule';
import express from 'express';
import compression from 'compression';
import SSRService from './modules/web/service/SSRService';
import {Logger} from '@nestjs/common';
import internalIp from 'internal-ip';
import AppHelper from '../../common/helper/AppHelper';
import { SSRBuildConf } from './modules/web/service/webpack/untils/SSRBuildConf';
import { NestExpressApplication } from '@nestjs/platform-express';
declare const module: any;
const serve = (path: string, cache: any) => express.static(path, {
  maxAge: cache && AppHelper.isProd() ? 1000 * 60 * 60 * 24 * 30 : 0,
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.get(SSRService).build(app);

  app.use(compression({threshold: 0}));
  app.use('/dist', serve(SSRBuildConf.outDir, true));
  app.use('/public', serve(AppHelper.pathResolve('public'), true));

  await app.listen(AppHelper.port());

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  Logger.log(`Server start http://localhost:${AppHelper.port()}`, 'LISTEN');
  Logger.log(`Server start http://${internalIp.v4.sync()}:${AppHelper.port()}`, 'LISTEN');
}

bootstrap();
