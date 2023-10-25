import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { middleware } from 'express-ctx';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(middleware);
  await app.listen(3000);
}
bootstrap();
