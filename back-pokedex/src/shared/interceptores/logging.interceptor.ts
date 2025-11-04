import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { finalize, Observable } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const startTime = Date.now();
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        const { method, url } = req;

        return next.handle().pipe(
            finalize(() => {
                const endTime = Date.now();
                const duration = endTime - startTime;
                const status = ctx.getResponse().statusCode;
                this.logger.log(`Response [${method}] ${url} - Status: ${status} - Duration: ${duration}ms`);
            })
        );
    }
}