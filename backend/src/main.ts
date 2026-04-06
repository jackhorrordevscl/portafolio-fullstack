/*
  ORDEN DEL PIPELINE: 
    - CORS
    - PREFIX (/api)
    - ValidationPipe -> puede lanzar errores
    - ExceptionFilter -> captura esos errores
    - RESPONSE AL CLIENTE

    Aseguramos que los errores de validación pasen un filtro personalizado y
    se normalicen antes de salir del backend
*/

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
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

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
