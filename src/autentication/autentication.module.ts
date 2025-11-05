import { Module } from '@nestjs/common';
import { AutenticationService } from './autentication.service';
import { AutenticationController } from './autentication.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ApiConfigService } from 'src/configuration/api-config.service';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import { JwtRefreshStrategy } from './strategy/jwt.refresh.strategy';

@Module({
  imports:[UsuarioModule, JwtModule, ConfigurationModule],
  controllers: [AutenticationController],
  providers: [AutenticationService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
})
export class AutenticationModule {}
