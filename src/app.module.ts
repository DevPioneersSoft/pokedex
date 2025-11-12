import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImportarPokemonesModule } from './importar-pokemones/importar-pokemones.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';
import { UsuarioModule } from './usuario/usuario.module';
import { FavoritosService } from './favoritos/favoritos.service';
import { FavoritosModule } from './favoritos/favoritos.module';
import { LoggingInterceptor } from './shared/interceptores/logging.interceptor';
import { EquipoModule } from './equipo/equipo.module';
import { AutenticationModule } from './autentication/autentication.module';
import { JwtGuard } from './autentication/guard/jwt.guard';
import { validate } from './configuration/env.validation';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      cache:true,
      validate
    }),
    PokemonModule,
    ImportarPokemonesModule,
    UsuarioModule,
    FavoritosModule,
    EquipoModule,
    AutenticationModule,
    ConfigurationModule
  ],
  controllers: [],
  providers: [PrismaService,{
    provide : 'APP_INTERCEPTOR',
    useClass: LoggingInterceptor
  },{
    provide : 'APP_GUARD',
    useClass: JwtGuard
  }],
})
export class AppModule {}
