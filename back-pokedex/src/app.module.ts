import { Module } from '@nestjs/common';
import { ImportarPokemonesModule } from './importar-pokemones/importar-pokemones.module';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [PokemonModule, ImportarPokemonesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
