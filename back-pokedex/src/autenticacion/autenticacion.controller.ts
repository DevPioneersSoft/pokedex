import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Request, UseGuards } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { LocalAuthGuard } from './guard/local.guard';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}
  
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    return this.autenticacionService.login(
      req.username,
      req.contrasena
    );
  }
}
