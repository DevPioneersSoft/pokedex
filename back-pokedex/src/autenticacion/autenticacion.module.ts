import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [UsuarioModule],
  controllers: [AutenticacionController],
  providers: [AutenticacionService, LocalStrategy],
})
export class AutenticacionModule {}
