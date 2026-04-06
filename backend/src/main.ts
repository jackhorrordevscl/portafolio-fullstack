import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //elimina propiedades no definidas
      forbidNonWhitelisted: true, //lanza error si vienen extras
      transform: true, //transforma tipos automáticamente
    }),
  );

  await app.listen(3000);
}
bootstrap();
