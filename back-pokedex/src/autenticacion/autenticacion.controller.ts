import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { Public } from '../shared/decorator/public.decorator';
import { AutenticacionService } from './autenticacion.service';
import { JwtRefreshAuthGuard } from './guard/jwt-refresh-auth.guard';
import { LocalAuthGuard } from './guard/local.guard';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    return this.autenticacionService.login(req.user, response);
  }

  @Public()
  @Get('algo')
  prueba() {
    return 'protegido';
  }

  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('/refresh')
  refresh(@Request() req, @Res({ passthrough: true }) response: Response) {
    return this.autenticacionService.refresh(req.user, response);
  }

  @Public()
  @Post('/logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("Authentication")
    response.clearCookie("Refresh", { path: '/autenticacion/refresh' })
  }
}
