import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { ImportarPokemonesModule } from './importar-pokemones/importar-pokemones.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config'
import { UsuarioModule } from './usuario/usuario.module';
import { FavoritosService } from './favoritos/favoritos.service';
import { LoggingInterceptor } from './shared/interceptor/logging.interceptor';
import { EquipoModule } from './equipo/equipo.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { JwtGuard } from './autenticacion/guard/jst.guard';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), PokemonModule, ImportarPokemonesModule, UsuarioModule, EquipoModule, AutenticacionModule],
  controllers: [],
  providers: [PrismaService, FavoritosService, {
    provide: 'APP_LOGGINS_INTERCEPTOR', //// esta es la forma mas apropieda apra usar el interceptor segun la documentacion.
    useClass: LoggingInterceptor
  },
    // {
    //   provide: 'APP_GUARD', //// esta es la configuracion que habilita que las urls esten autentificadas
    //   useClass: JwtGuard
    // }

  ],
})
export class AppModule { }
