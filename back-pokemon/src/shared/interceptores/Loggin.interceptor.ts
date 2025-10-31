import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const requestId = uuidv4();
    request.requestId = requestId;

    this.logger.log(`Peticion entrante [${requestId}]: ${request.method} ${request.url}`);

    return next.handle().pipe(
      tap(() => {
        this.logger.log(`Respuesta de la peticion [${requestId}]: ${response.statusCode}`);
      }),
    );
  }
}
