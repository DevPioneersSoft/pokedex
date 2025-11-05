import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JWTStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigService } from 'src/configuration/api-config.service';
import { JwtGuard } from './guard/jwt.guard';

@Module({
  imports: [
    UsuariosModule,
    PassportModule,
    JwtModule.register({}),
    ConfigModule,
  ],
  controllers: [AutenticacionController],
  providers: [AutenticacionService, LocalStrategy, JWTStrategy, ApiConfigService, JwtGuard],
  exports: [JwtGuard, JWTStrategy],
})
export class AutenticacionModule {}
