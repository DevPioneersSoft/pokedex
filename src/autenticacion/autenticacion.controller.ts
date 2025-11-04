import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Request, UseGuards } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { CreateAutenticacionDto } from './dto/create-autenticacion.dto';
import { UpdateAutenticacionDto } from './dto/update-autenticacion.dto';
import type { Response } from 'express';
import { LocalGuard } from './guard/local.guard';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @UseGuards(LocalGuard)
  @Post()
  async loggin (@Request() req, @Res({passthrough:true}) response: Response){
    return this.autenticacionService.loggin(req.user, response)
  }
  
}
