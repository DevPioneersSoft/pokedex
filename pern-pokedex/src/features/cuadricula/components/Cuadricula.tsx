import { useBuscarPokemones } from "../hooks/useBuscarPokemones.hook";
import useFavoritos from "../hooks/useFavoritos";
import type { Pokemon } from "../interfaces/Pokemon.interface";
import CardPokemon from "./CardPokemon";

interface CuadriculaProps {
  callback?: (pokemon: Pokemon) => void
}

export default function Cuadricula({ callback }: CuadriculaProps) {
  const {favoritos,toggleFav,agregar} =  useFavoritos()
 
  const {
    pokemones,
    isLoading,
    isFetching,
    prevPage,
    nextPage,
    hasPrevPage,
    hasNextPage,
    page,
    totalPages,
    searchPokemons,
  } = useBuscarPokemones({ initialPage: 1, initialPageSize: 30, favoritos });

  
  if (isLoading) return <div>Cargando...</div>;
  if (isFetching) return <div>Refrescando...</div>;
  const callbackFav=async(p : Pokemon)=>{
    if (callback){
      callback(p);
    }
    toggleFav(p);
    await agregar.mutateAsync();
  }
  return (
    <>
      <input
        type="text"
        onKeyUp={(e) => searchPokemons(e.currentTarget.value)}
        className="bg-secondary-200 rounded-lg p-2"
        placeholder="Buscar:"
      />
      <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(theme(spacing.28),1fr))] rounded-2xl p-6">

        {pokemones?.map((pokemon: Pokemon) => {
          const select = favoritos.includes(pokemon.id)
         return ( <CardPokemon
            key={pokemon.id}
            pokemon={pokemon}
            callback={callbackFav}
            select={select}
          />)
        })}
      </div>
      {pokemones && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            className="px-3 py-1 rounded bg-primary-200 disabled:opacity-50"
            onClick={() => prevPage()}
            disabled={!hasPrevPage}
          >
            Anterior
          </button>
          <span>
            Página {page} de {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded bg-primary-200 disabled:opacity-50"
            onClick={() => nextPage()}
            disabled={!hasNextPage}
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  );
}
