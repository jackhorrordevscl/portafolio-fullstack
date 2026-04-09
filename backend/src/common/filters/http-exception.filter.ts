import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';


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

    let message: string[];

    if (typeof exceptionResponse === 'string') {
      message = [exceptionResponse];
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null
    ) {
      const res = exceptionResponse as { message?: unknown };

      if (Array.isArray(res.message)) {
        message = res.message;
      } else if (typeof res.message === 'string') {
        message = [res.message];
      } else {
        message = ['UNKNOWN_ERROR'];
      }
    } else {
      message = ['UNKNOWN_ERROR'];
    }

    const error = exception.name?.replace('Exception', '') ?? 'Error';    
    
    response.status(status).json({
      statusCode: status,
      message, //SIEMPRE STRING[]
      error,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
