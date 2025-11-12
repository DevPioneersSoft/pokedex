import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as argon2 from 'argon2';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Payload } from './entities/payload';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';


@Injectable()
export class AutenticationService {

  constructor(private readonly usuarioService :UsuarioService,
    private config: ConfigService,
    private jwtService: JwtService,

  ){}

  async validarUsuario(username : string, password:string){
    const user = await this.usuarioService.findByUserName(username);
    if(user){
      if(user.contrasena){
          if(await argon2.verify(user.contrasena, password)){
              return user;
          }
      }
    }
    return null;
  }

  async login(usuario: Usuario, response: Response){  
    
    console.log(usuario.username)
      console.log(usuario.id)
      const payload = this.getPayload(usuario);

       

      const secret = this.config.get('JWT_SECRET');
      const expiresIn = this.config.get('JWT_EXPIRES_IN');
      const refreshSecret = this.config.get('JWT_REFRESH_SECRET');
      const expiresRefreshIn = this.config.get('JWT_REFRESH_EXPIRES_IN');
      const envirement = this.config.get('NODE_ENV');

      const token = this.jwtService.sign(payload, {
        secret,
        expiresIn,
      });

      response.cookie('Authentication', token, {
        httpOnly: true,
        secure: envirement === 'production',
        maxAge: ms(`${expiresIn}`)
      });

      const refresh = this.jwtService.sign(payload, {
        secret:refreshSecret,
        expiresIn:expiresRefreshIn,
      });

      response.cookie('Refresh', token, {
        httpOnly: true,
        secure: envirement === 'production',
        maxAge: ms(`${expiresRefreshIn}`),
        path: '/autentication/refresh'
      });

      return {payload};
  }

   async refresh(usuario: Payload, response: Response){  
      const secret = this.config.get('JWT_SECRET');
      const expiresIn = this.config.get('JWT_EXPIRES_IN');  
      const envirement = this.config.get('NODE_ENV');

      const token = this.jwtService.sign(usuario, {
        secret,
        expiresIn,
      });

      response.cookie('Authentication', token, {
        httpOnly: true,
        secure: envirement === 'production',
        maxAge: ms(`${expiresIn}`)
      });

      return {usuario};
  }

  getPayload({id, username}: Usuario) : Payload{
      return {id, username, sub: id};
  }
  
}