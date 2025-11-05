import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AutenticacionController } from './autenticacion.controller';
import { AutenticacionService } from './autenticacion.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigurationModule } from 'src/configuration/configuration.module';

@Module({
  imports: [UsuarioModule, ConfigModule, JwtModule, ConfigurationModule],
  controllers: [AutenticacionController],
  providers: [AutenticacionService, LocalStrategy, JwtStrategy],
})
export class AutenticacionModule {}
