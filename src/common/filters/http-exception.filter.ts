import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<any>();
    const response = ctx.getResponse<any>();
    const isHttpException = exception instanceof HttpException;
    const status = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = isHttpException ? exception.getResponse() : 'Internal server error';
    const message = typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message ?? 'Internal server error';
    const error = typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).error ?? 'Error';

    const responseBody = {
      statusCode: status,
      message,
      error,
      path: request.originalUrl ?? request.url,
      requestId: request.requestId,
      timestamp: new Date().toISOString(),
    };

    console.error(
      JSON.stringify({
        level: 'error',
        message: 'http_error',
        requestId: request.requestId,
        method: request.method,
        path: request.originalUrl ?? request.url,
        statusCode: status,
        error,
        details: message,
        user: request.user
          ? {
              sub: request.user.sub,
              username: request.user.username,
              roles: request.user.roles,
            }
          : undefined,
        timestamp: new Date().toISOString(),
      }),
    );

    response.status(status).json(responseBody);
  }
}