import { useCallback, useState } from 'react';
import type { Pokemon } from '../../interfaces/Pokemon.interface';
import CardPokemon from './CardPokemon';
import ModalPokemonInfo from './ModalPokemonInfo';
import useFavoritos from '../../ejemploHooks/hooks/useFavoritos';
import { useEquipo } from '../../ejemploHooks/hooks/useEquipo';


const Cuadricula = ({ cargando, recargando, error, pokemonsList }: {
  cargando: boolean;
  recargando: boolean;
  error: { message: string } | null;
  pokemonsList: Pokemon[];
}) => {
  
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState<Pokemon | null>(null);
  const { favoritos } = useFavoritos();
  const { equipo, agregarPokemon, quitarPokemon, estaEnEquipo, maximo } = useEquipo();
  const equipoLleno = equipo.length >= maximo;

  const handleDescripcion = (pokemon: Pokemon) => {
    setPokemonSeleccionado(pokemon);
  };

  // ya no uso este pero por si las dudas se queda :p
  // const handleToggleEquipo = useCallback((pokemon: Pokemon) => {
  //   if (estaEnEquipo(pokemon.id)) {
  //     quitarPokemon(pokemon.id);
  //   } else {
  //     agregarPokemon(pokemon);
  //   }
  // }, [agregarPokemon, quitarPokemon, estaEnEquipo]);

  const cerrarModal = () => {
    setPokemonSeleccionado(null);
  };

  if (cargando || recargando) return <div className="text-white text-lg">{recargando ? 'Recargando pokemones...' : 'Cargando pokemones...'}</div>;
  if (error) return <div className="text-red-500">{error.message}</div>;

  // primero los favoritos
  const pokemonsOrdenados = [...pokemonsList].sort((a, b) => {
    const aFav = favoritos.includes(a.id);
    const bFav = favoritos.includes(b.id);
    if (aFav === bFav) return 0;
    return aFav ? -1 : 1;
  });

  return (
    <>
  <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 p-2 justify-center">
        {pokemonsOrdenados.map((pokemon) => (
          <CardPokemon
            key={pokemon.id}
            pokemon={pokemon}
            callback={handleDescripcion}
            enEquipo={estaEnEquipo(pokemon.id)}
            onAgregarEquipo={() => {
              if (estaEnEquipo(pokemon.id)) {
                quitarPokemon(pokemon.id);
              } else {
                agregarPokemon(pokemon);
              }
            }}
            equipoLleno={equipoLleno}
          />
        ))}
      </div>
      {pokemonSeleccionado && (
        <ModalPokemonInfo pokemon={pokemonSeleccionado} onClose={cerrarModal} />
      )}
    </>
  );
};

export default Cuadricula;

