import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { UsuarioEntity } from 'src/usuarios/entities/usuario.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Payload } from './Payload';
import ms from 'ms';

@Injectable()
export class AutenticacionService {

  constructor(private readonly usuariosService: UsuariosService,
    private config: ConfigService,
    private jwtService: JwtService
  ) {}

  async validarUsuario(username: string, pass: string): Promise<any> {
    const usuario = await this.usuariosService.validateUser(username, pass);
    return usuario;
  }

  async login(usuario: UsuarioEntity, response: Response) {
    const payload = this.getPayload(usuario);

    const secret = this.config.get('JWT_SECRET');
    const expiresIn = this.config.get('JWT_EXPIRES_IN');
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

  getPayload({id, username}: UsuarioEntity): Payload {
    return { 
      id: id, 
      username: username, 
      sub: id 
    };
  }

}
