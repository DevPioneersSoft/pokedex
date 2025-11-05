import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { ImportarPokemonesModule } from './importar-pokemones/importar-pokemones.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { FavoritosService } from './favoritos/favoritos.service';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { EquipoModule } from './equipo/equipo.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { JwtGuard } from './autenticacion/guard/jwt.guard';
import { config } from 'dotenv';
import { validate } from './configuration/env.validation';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: 
  [
    PokemonModule, 
    UsuarioModule,
    ImportarPokemonesModule,
    ConfigModule.forRoot({ 
      isGlobal: true,
      cache: true,
      validate  
    }),
    EquipoModule,
    AutenticacionModule,
    ConfigurationModule
  ],
  controllers: [],
  providers: [PrismaService, FavoritosService, 
  {
    provide: 'APP_INTERCEPTOR', 
    useClass: LoggingInterceptor,
  },
  {
    provide: 'APP_GUARD', 
    useClass: JwtGuard,
  },],
})
export class AppModule {}
