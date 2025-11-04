import { Injectable, Logger } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import  * as argon from 'argon2';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Payload } from './entities/payload';
import {  ConfigService } from '@nestjs/config';
import { Response } from 'express';
import {JwtService} from '@nestjs/jwt'
import ms from 'ms';

@Injectable()
export class AutenticacionService {
  constructor(private usuarioService: UsuarioService,
    private config:ConfigService,
    private jwtService : JwtService
  ){}
private logger =  new Logger(AutenticacionService.name);
  async validarUsuario(usarname:string, pass:string){
    const usr =  await this.usuarioService.findByUsername(usarname);
    this.logger.log(usr)
    if(usr){
      if(usr.contrasena){
        if(await argon.verify(usr.contrasena,pass)){
          return usr;
        }
      }
    }
    return null;
  }

  async loggin(usuario:Usuario, response: Response){
     const payload =  this.getPayload(usuario);

     const secret           = this.config.get("JWT_SECRET");
     const expiresIn        = this.config.get("JWT_EXPIRES_IN");
     const refreshSecret    = this.config.get("JWT_REFRESH_SECRET");
     const expiresRefreshIn = this.config.get("JWT_REFRESH_EXPIRES_IN");
     const enviroment           = this.config.get("NODE_ENV");

     const token = this.jwtService.sign(payload,{
      secret,
      expiresIn
     });

     response.cookie('Authentication',token,{
      httpOnly:true,
      secure: enviroment === 'production',
      maxAge: ms(`${expiresIn}`)

     });

     const refresh = this.jwtService.sign(payload,{
      secret: refreshSecret,
      expiresIn: expiresRefreshIn
     })

     response.cookie('Refresh',refresh,{
      httpOnly:true,
      secure: enviroment === 'production',
      maxAge: ms(`${expiresRefreshIn}`)
     })

     return {payload}
  }

  //funcion utilitaria para transformar
  getPayload({username,id}: Usuario) : Payload{
    return { id,username,sub:id};

  }
}
