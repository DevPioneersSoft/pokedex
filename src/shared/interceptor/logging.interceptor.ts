import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { finalize, Observable } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor{

    private readonly logger = new Logger(LoggingInterceptor.name);
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const starTime =  Date.now();
        const ctx =  context.switchToHttp();
        const request = ctx.getRequest();
        const {method, url} = request;
       return next.handle().pipe(
        finalize(()=>{
            const elapsed = Date.now() - starTime;
            const res = ctx.getResponse();
            const estatus = res?.statuscode??'NA';

            this.logger.log(`${method} ${url} - ${elapsed}ms ${estatus}`)
        })
       ) 
    }

}