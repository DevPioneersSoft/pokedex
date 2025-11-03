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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    PokemonModule,
    ImportarPokemonesModule,
    UsuarioModule,
    FavoritosModule,
    EquipoModule
  ],
  controllers: [],
  providers: [PrismaService,{
    provide : 'APP_INTERCEPTOR',
    useClass: LoggingInterceptor
  }],
})
export class AppModule {}
