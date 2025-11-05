import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";
import { Payload } from "../entities/payload";
import { ApiConfigService } from "src/configuration/api-config.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private apiConfigService: ApiConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies?.Authentication,
            ]),
            ignoreExpiration: false,
            //secretOrKey: config.get('JWT_SECRET') || 'MISECRET',
            secretOrKey: apiConfigService.getJwtSecret
        });
    }

    async validate(payload: Payload){ 
        return payload
    }
}