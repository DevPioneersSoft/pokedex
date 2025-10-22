import { useState } from 'react';
import type { Pokemon } from '../../interfaces/Pokemon.interface';
import CardPokemon from './CardPokemon';
import ModalPokemonInfo from './ModalPokemonInfo';

const Cuadricula = ({ cargando, recargando, error, pokemonsList }: {
  cargando: boolean;
  recargando: boolean;
  error: { message: string } | null;
  pokemonsList: Pokemon[];
}) => {
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState<Pokemon | null>(null);

  if (cargando || recargando) return <div className="text-white text-lg">{recargando ? 'Recargando pokemones...' : 'Cargando pokemones...'}</div>;
  if (error) return <div className="text-red-500">{error.message}</div>;

  const handlePokemonClick = (pokemon: Pokemon) => {
    setPokemonSeleccionado(pokemon);
  };

  const cerrarModal = () => {
    setPokemonSeleccionado(null);
  };

  return (
    <>
      <div className="w-full bg-blue-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-2">
        {pokemonsList.map((pokemon) => (
          <CardPokemon key={pokemon.id} pokemon={pokemon} callback={handlePokemonClick} />
        ))}
      </div>
      {pokemonSeleccionado && (
        <ModalPokemonInfo pokemon={pokemonSeleccionado} onClose={cerrarModal} />
      )}
    </>
  );
};

export default Cuadricula;

