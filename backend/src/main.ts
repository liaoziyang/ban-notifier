import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

/**
 * Start the application
 */
async function bootstrap() {
  const logger = new Logger('bootstrap');

  process.on('unhandledRejection', e => {
    logger.error(`Unhandled Promise rejection! ${e}`);
    throw e;
  });

  dotenv.config();
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.PORT);

  logger.log(`Application listening on port ${process.env.PORT}`);

}
bootstrap();
