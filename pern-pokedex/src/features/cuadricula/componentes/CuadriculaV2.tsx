import CardPokemonV2 from './CardPokemonV2'
import { pokemonDummies } from './pokemon.dummy'

export default function CuadriculaV2() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-6">
        {pokemonDummies.map((pokemon) => (
          <CardPokemonV2 key={pokemon.id} {...pokemon} />
        ))}
      </div>
    </div>
  );
}