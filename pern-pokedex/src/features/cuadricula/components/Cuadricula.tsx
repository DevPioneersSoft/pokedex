import { useBuscarPokemones } from "../hooks/useBuscarPokemones.hook";
import useFavoritos from "../hooks/useFavoritos";
import type { Pokemon } from "../interfaces/Pokemon.interface";
import CardPokemon from "./CardPokemon";

interface CuadriculaProps {
  callback?: (pokemon: Pokemon) => void,
  registrarFavoritos?: boolean
}

export default function Cuadricula({ callback, registrarFavoritos = true}: CuadriculaProps) {
  const { favoritos, agregar, toggleFav } = useFavoritos()

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

  const onClickPokemon = async (pokemon: Pokemon) => {
    await agregar.mutateAsync();
    if (callback) {
      callback(pokemon)
    }
    if (!registrarFavoritos) return
    toggleFav(pokemon)
    await agregar.mutateAsync()
  }

  if (isLoading) return <div>Cargando...</div>;
  if (isFetching) return <div>Refrescando...</div>;
  
  return (
    <>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              searchPokemons(e.currentTarget.value.toLowerCase());
            }
          }}
          className="bg-secondary-200 rounded-lg p-2 w-64 text-center"
          placeholder="Buscar..."
        />
      </div>

      <div className="grid gap-7 [grid-template-columns:repeat(auto-fit,minmax(6rem,1fr))] rounded-2xl p-6">
        {pokemones?.map((pokemon: Pokemon) => {
          const isSelected = favoritos.includes(pokemon.id);

          return (
            <div
              key={pokemon.id}
              className="w-28 rounded-xl relative"
            >
              {isSelected && (
                <span className={`
                  absolute top-1 right-2 z-10
                  transition-opacity duration-200
                  ${favoritos ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                `}>
                  ❤️
                </span>
              )}

              <CardPokemon
                key={pokemon.id}
                pokemon={pokemon}
                callback={onClickPokemon}
              />
            </div>
              );
            })}
      </div>

      {pokemones && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            className="px-3 py-1 rounded bg-blue-500 disabled:opacity-50"
            onClick={() => prevPage()}
            disabled={!hasPrevPage}
          >
            Anterior
          </button>
          <span>
            Página {page} de {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded bg-blue-200 disabled:opacity-50"
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
