import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Request, UseGuards } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { CreateAutenticacionDto } from './dto/create-autenticacion.dto';
import { UpdateAutenticacionDto } from './dto/update-autenticacion.dto';
import { LocalAuthGuard } from './guard/local.guard';
import type { Response } from 'express'; // Import Response from express
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Public } from './decorator/public.decorator';
import { JwtRefreshAuthGuard } from './guard/jwt-refresh-auth.guard';
import { JwtGuard } from './guard/jwt.guard';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService,
    private readonly usuarioService: UsuarioService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req, @Res({passthrough: true}) response: Response){
    return this.autenticacionService.login(req.user, response);
  }

  @UseGuards(JwtGuard)
  @Get('/prueba')
  async prueba(){
    return "contenido"
  }
  
  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('/refresh')
  async refresh(@Request() req, @Res({passthrough: true}) response: Response){
    return this.autenticacionService.refresh(req.body, response)
  }

  @Public()
  @Post('/logout')
  async logout(@Res({passthrough: true}) response: Response){
    response.clearCookie('Authentication')
    response.clearCookie('Refresh', {path: '/autenticacion/refresh'})
  }
}
