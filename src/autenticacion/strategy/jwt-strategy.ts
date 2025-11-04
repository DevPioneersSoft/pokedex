import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "../entities/payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request : Request) => request.cookies?.Authentication,
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'MISECRET'
        })
    }

    validate(payload: Payload) {
        return payload;
    }
}