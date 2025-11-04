import { Injectable, UnauthorizedException } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport'
import { Strategy } from "passport-local";
import { AutenticacionService } from "../autenticacion.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private auth: AutenticacionService){
        super({
            usernameField:'username',
            passwordField: 'contrasena'
        });
    }

    async validate(username:string, password:string): Promise<any> {
        const user =  await this.auth.validarUsuario(username,password)
        if(!user){
            throw new  UnauthorizedException();
        }
        return user;
    }

}