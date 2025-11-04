import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImportarPokemonesModule } from './importar-pokemones/importar-pokemones.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { PrismaService } from './prisma/prisma.service';
import { LoggingInterceptor } from './shared/interceptores/logging.interceptor';
import { FavoritosDto } from './usuario/dto/favoritos.dto';
import { UsuarioModule } from './usuario/usuario.module';
// import { FavoritosService } from './favoritos/favoritos.service';
import { EquipoModule } from './equipo/equipo.module';
import { PrismaModule } from './prisma/prisma.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    PokemonModule,
    ImportarPokemonesModule,
    UsuarioModule,
    EquipoModule,
    AutenticacionModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    FavoritosDto,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule { }
