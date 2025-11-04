import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt-strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[UsuarioModule],
  controllers: [AutenticacionController],
  providers: [AutenticacionService,LocalStrategy, JwtStrategy, JwtService],
})
export class AutenticacionModule {}
