import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { middleware } from 'express-ctx';
import { ExceptionsFilter } from './common/exceptions.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(middleware);
  app.enableCors();
  app.useGlobalFilters(new ExceptionsFilter());
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port || 3000);
}
bootstrap();
