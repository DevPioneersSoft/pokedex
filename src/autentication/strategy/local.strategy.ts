import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AutenticationService } from "../autentication.service";
import { Strategy } from "passport-local";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private auth : AutenticationService){
        super({
            usernameField : 'username',
            passwordField: 'constrasena'
        });
    }

    async validate(username: string, password: string): Promise<any>{
        const user = await this.auth.validarUsuario(username,password);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }

}