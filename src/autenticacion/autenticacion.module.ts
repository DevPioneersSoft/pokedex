import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt-strategy';

@Module({
  imports:[UsuarioModule],
  controllers: [AutenticacionController],
  providers: [AutenticacionService,LocalStrategy, JwtStrategy ],
})
export class AutenticacionModule {}
