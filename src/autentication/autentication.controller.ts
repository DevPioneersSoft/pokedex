import { Controller, Get, Post, Res, Body, Patch, Param, Delete, Request, UseGuards} from '@nestjs/common';
import { AutenticationService } from './autentication.service';
import type { Response } from 'express';
import { LocalAuthGuard } from './guard/local.guard';
import { Public } from './decorators/decorator.public';
import { JwtRefreshAuthGuard } from './guard/jwt.refresh.auth.guard';
import { JwtGuard } from './guard/jwt.guard';



@Controller('autentication')
export class AutenticationController {
  constructor(private readonly autenticationService: AutenticationService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req, @Res({passthrough:true}) response : Response) { 
    return this.autenticationService.login(req.user, response);
  }

 
  @UseGuards(JwtGuard)
  @Get('prueba')
  prueba(){
    return "contenido";
  }

  @Public()  
  @UseGuards(JwtRefreshAuthGuard)
  @Post('/refresh')
  refresh(@Request() req, @Res({passthrough:true}) response : Response){
    return this.autenticationService.refresh(req.user, response);
  }

  @Post('/logout')
  async logout(@Res({passthrough:true}) response : Response){
    response.clearCookie('Authentication');
    response.clearCookie('Refresh',{path:'/autentication/refresh'});
  }

}
