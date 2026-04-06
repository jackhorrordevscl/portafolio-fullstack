/* 
📌 Objetivo técnico

Interceptar cualquier HttpException y normalizar la respuesta para que:

message sea siempre string
nunca llegue string[] al frontend
el formato sea consistente
*/

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { timestamp } from 'rxjs';

//DETECTA ERRORES DE NESTJS
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR;

    //EXTRAE EL RESPONSE INTERNO 
    const exceptionResponse = exception.getResponse();

    let message: string;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null
    ) {
      const res = exceptionResponse as any;

      if (Array.isArray(res.message)) {
        message = res.message.join(', ');
      } else if (typeof res.message === 'string') {
        message = res.message;
      } else {
        message = 'Error inesperado';
      }
    } else {
      message = 'Error inesperado...';
    }

    let error = 'Error';
    if (exception.name) {
      error = exception.name.replace('Exception', '');
    }
    
    response.status(status).json({
      statusCode: status,
      message,
      error,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
