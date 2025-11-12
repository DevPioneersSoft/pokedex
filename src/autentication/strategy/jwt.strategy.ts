import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "../entities/payload";
import { ApiConfigService } from "src/configuration/api-config.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private apiConfigService: ApiConfigService
    ){
        super({
            jwtFromRequest : ExtractJwt.fromExtractors([
                (request:Request) => request.cookies?.Authentication,
            ]),
            ignoreExpiration: false,            
            secretOrKey: apiConfigService.getJwtSecret,
        });
    }

    async validate(payload : Payload) {
        return payload;
    }
}