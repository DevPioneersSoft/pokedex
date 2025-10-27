import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { PruebaModule } from './prueba/prueba.module';

@Module({
  imports: [PruebaModule, PokemonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
