import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImportarPokemonesModule } from './importar-pokemones/importar-pokemones.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { PrismaService } from './prisma/prisma.service';
import { UsuarioModule } from './usuario/usuario.module';
import { FavoritosDto } from './usuario/dto/favoritos.dto';
import { LoggingInterceptor } from './shared/interceptores/logging.interceptor';
// import { FavoritosService } from './favoritos/favoritos.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PokemonModule,
    ImportarPokemonesModule,
    UsuarioModule,
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
export class AppModule {}
