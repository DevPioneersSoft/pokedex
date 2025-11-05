import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { LocalStrategy } from './strategy/local.strategy';
import { LocalAuthGuard } from './guard/local.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigService } from 'src/configuration/api-config.service';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';

@Module({
  imports: [UsuarioModule, JwtModule, ConfigModule, ConfigurationModule],
  controllers: [AutenticacionController],
  providers: [AutenticacionService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
})
export class AutenticacionModule {}
