import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'http://192.168.1.183:5173',
      'http://localhost:5173',
      'https://portafolio-fullstack-sage.vercel.app',
      'https://api.github.com/users/jackhorrordevscl/repos',
    ],
    credentials: true,
  });

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //transforma tipos automáticamente
      exceptionFactory: (errors) => {
        const messages = errors
        .map(err => Object.values(err.constraints ?? {}))
        .flat()

        return new BadRequestException({
          message: messages,
        });
      },
      /*whitelist: true, //elimina propiedades no definidas
      forbidNonWhitelisted: true, //lanza error si vienen extras*/
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
