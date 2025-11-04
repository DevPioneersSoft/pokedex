import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Payload } from '../entities/payload';

@Injectable()
export class JwtSrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.Authentication,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'MISECRET',
    });
  }

  validate(payload: Payload) {
    return payload;
  }
}
