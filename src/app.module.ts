import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { ImportarPokemonesModule } from './importar-pokemones/importar-pokemones.module';
import { PrismaService } from './prisma/prisma.service';
import {ConfigModule} from '@nestjs/config'
import { UsuarioModule } from './usuario/usuario.module';
import { FavoritosService } from './favoritos/favoritos.service';
@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal:true
  }) ,PokemonModule, ImportarPokemonesModule, UsuarioModule],
  controllers: [],
  providers: [PrismaService, FavoritosService],
})
export class AppModule {}
 