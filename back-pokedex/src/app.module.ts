import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { ImportarPokemonesModule } from './importar-pokemones/importar-pokemones.module';

@Module({
  imports: [PokemonModule, ImportarPokemonesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
