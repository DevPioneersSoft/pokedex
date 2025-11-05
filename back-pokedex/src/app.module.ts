import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { ImportarPokemonModule } from './importar-pokemon/importar-pokemon.module';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { FavoritosModule } from './favoritos/favoritos.module';
import { LoggingInterceptor } from './shared/interceptores/logging.interceptor';
import { EquipoModule } from './equipo/equipo.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { JwtGuard } from './autenticacion/guard/jwt.guard';
import { validate } from './configuration/env.validation';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      cache: true,
      validate  
    }),
    PokemonModule, 
    ImportarPokemonModule, UsuariosModule, FavoritosModule, EquipoModule, AutenticacionModule, ConfigurationModule
  ],
  controllers: [],
  providers: [
    { //La mejor forma de aplicar un interceptor globalmente
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
    {
      provide: 'APP_GUARD',
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
