import { CallHandler, ExecutionContext, Injectable, NestInterceptor, } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startedAt = Date.now();
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request & { requestId?: string; user?: any }>();
    const res = ctx.getResponse<any>();

    const method = (req as any).method;
    const url = (req as any).originalUrl ?? (req as any).url;
    const requestId = (req as any).requestId;
    const user = (req as any).user;

    return next.handle().pipe(
      tap({
        next: () => {
          const durationMs = Date.now() - startedAt;
          const statusCode = res.statusCode;

          console.log(
            JSON.stringify({
              level: 'info',
              message: 'http_request',
              requestId,
              method,
              path: url,
              statusCode,
              durationMs,
              user: user
                ? { username: user.username, roles: user.roles, sub: user.sub }
                : undefined,
              timestamp: new Date().toISOString(),
            }),
          );
        },
      }),
    );
  }
}