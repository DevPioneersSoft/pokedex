import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { ImportarPokemonesModule } from './importar-pokemones/importar-pokemones.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { LoggingInteceptor } from './shared/interceptores/logging.interceptor';
import { EquipoModule } from './equipo/equipo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PokemonModule, 
    ImportarPokemonesModule, 
    UsuarioModule, EquipoModule
  ],
  controllers: [],
  providers: [PrismaService,
    {
      provide : 'APP_INTERCEPTOR',
      useClass : LoggingInteceptor
    }
  ],
})
export class AppModule {}
