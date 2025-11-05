import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "../Payload";
import { ApiConfigService } from "src/configuration/api-config.service";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private apiConfigService: ApiConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(), // Desde Authorization header
        (request: Request) => {
          return request?.cookies?.Authentication || null; // Desde cookies
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: apiConfigService.getJwtSecret,
    });
  }

  async validate(payload: Payload) {
    return payload;
  }
}