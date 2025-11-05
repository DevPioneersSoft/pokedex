import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Request, UseGuards } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { LocalAuthGuard } from './guard/local.guard';
import type { Response } from 'express';
import { Public } from './decorators/public.decorator';

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
  @Post('/refresh')
  async refresh(@Request() req, @Res({ passthrough: true }) response: Response) {
    return { message: 'Refresh successful' };
  }

  @Public()
  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('Authentication');
    response.clearCookie('Refresh');
    return { message: 'Logout successful' };
  }
}
