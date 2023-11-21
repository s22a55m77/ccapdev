import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { middleware } from 'express-ctx';
import { ExceptionsFilter } from './common/exceptions.filter';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(middleware);
  app.enableCors({
    origin: ['http://localhost:5173', 'localhost'],
    credentials: true,
  });
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  app.use(
    session({
      secret: configService.get<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      rolling: true,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  const port = configService.get<number>('PORT');
  await app.listen(port || 3000);
}
bootstrap();
