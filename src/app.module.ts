import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { ImportarPokemonesModule } from './importar-pokemones/importar-pokemones.module';
import { PrismaService } from './prisma/prisma.service';
import {ConfigModule} from '@nestjs/config'
@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal:true
  }) ,PokemonModule, ImportarPokemonesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
 