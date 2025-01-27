import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { Express } from 'express';
import { Server } from 'http';
import { Context } from 'aws-lambda';
import { createServer, proxy, Response } from 'aws-serverless-express';
import * as express from 'express';

let cachedServer: Server;

async function createExpressApp(
  expressApp: Express,
): Promise<INestApplication> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  app.enableCors();
  return app;
}

// TO RUN APP LOCALLY
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3004);
}

bootstrap();
// END TO RUN APP LOCALLY

// async function bootstrap(): Promise<Server> {
//   const expressApp = express();
//   const app = await createExpressApp(expressApp);
//   await app.init();
//   return createServer(expressApp);
// }

// export async function handler(event: any, context: Context): Promise<Response> {
//   if (!cachedServer) {
//     const server = await bootstrap();
//     cachedServer = server;
//   }
//   return proxy(cachedServer, event, context, 'PROMISE').promise;
// }
