import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Response } from 'express';
import ms from 'ms';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Payload } from './entities/payload';

@Injectable()
export class AutenticacionService {
  constructor(
    private usuarioService: UsuarioService,
    private config: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validarUsuario(username: string, pass: string) {
    const user = await this.usuarioService.findByUsername(username);

    if (user) {
      if (user.contrasena) {
        if (await argon2.verify(user.contrasena, pass)) {
          return user;
        }
      }
    }
    return null;
  }

  async login(usuario: Usuario, response: Response) {
    const payload = this.getPayload(usuario);

    const secret = this.config.get('JWT_SECRET');
    const expiresIn = this.config.get('JWT_EXPIRES_IN')!;
    const refreshSecret = this.config.get('JWT_REFRESH_SECRET');
    const expiresRefreshIn = this.config.get('JWT_REFRESH_EXPIRES_IN');
    const enviroment = this.config.get('NODE_ENV');

    const token = this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });

    response.cookie('Authentication', token, {
      httpOnly: true,
      secure: enviroment === 'production',
      maxAge: ms(`${expiresIn}`),
    });

    const refresh = this.jwtService.sign(payload, {
      secret: refreshSecret,
      expiresIn: expiresRefreshIn,
    });

    response.cookie('Refresh', refresh, {
      httpOnly: true,
      secure: enviroment === 'production',
      maxAge: ms(`${expiresRefreshIn}`),
    });

    return { payload };
  }

  getPayload({ id, username }: Usuario): Payload {
    return { id, username, sub: id };
  }
}
