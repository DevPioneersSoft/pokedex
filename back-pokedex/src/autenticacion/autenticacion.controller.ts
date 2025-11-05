import { Controller, Post, Res, Request, UseGuards, Get } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { LocalAuthGuard } from './guard/local.guard';
import type { Response } from 'express';
import { Public } from '../shared/decorator/public.decorator';
import { JwtGuard } from './guard/jwt.guard';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    return this.autenticacionService.login(req.user, response);
  }

  @Public()
  @Get('algo')
  @UseGuards(JwtGuard)
  prueba() {
    return 'protegido';
  }

  @Public()
  @Post('/logout')
  logout() {
    // Implementar logout si es necesario
    console.log('Logout no implementado');
  }
}
