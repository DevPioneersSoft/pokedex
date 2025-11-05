import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImportarPokemonesModule } from './importar-pokemones/importar-pokemones.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { PrismaService } from './prisma/prisma.service';
import { FavoritosDto } from './usuario/dto/favoritos.dto';
import { UsuarioModule } from './usuario/usuario.module';
// import { FavoritosService } from './favoritos/favoritos.service';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { JwtGuard } from './autenticacion/guard/jwt.guard';
import { ConfigurationModule } from './configuration/configuration.module';
import { validate } from './configuration/env.validation';
import { EquipoModule } from './equipo/equipo.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggingInterceptor } from './shared/interceptores/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate,
    }),
    PrismaModule,
    PokemonModule,
    ImportarPokemonesModule,
    UsuarioModule,
    EquipoModule,
    AutenticacionModule,
    ConfigurationModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    FavoritosDto,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule { }
