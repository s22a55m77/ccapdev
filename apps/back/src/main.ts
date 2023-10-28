import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { middleware } from 'express-ctx';
import { ExceptionsFilter } from './common/exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(middleware);
  app.enableCors();
  app.useGlobalFilters(new ExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
