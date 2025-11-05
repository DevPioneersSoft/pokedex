import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "../decorator/public.decorator";

@Injectable()
export class JwtGuard extends AuthGuard("local"){
    constructor(private reflector: Reflector){
        super();
    }

    canActivate(context: ExecutionContext){
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if(isPublic){
            return true;
        }
        return super.canActivate(context);
    }
    handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
        
        if(err || !user){
            return new UnauthorizedException();
        }
        return user;
    }
}