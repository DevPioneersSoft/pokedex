import { useBuscarPokemones } from "../hooks/useBuscarPokemones.hook";
import type { Pokemon } from "../interfaces/Pokemon.interface";
import CardPokemon from "./CardPokemon";

interface CuadriculaProps {
  callback?: (pokemon: Pokemon) => void;
}

export default function Cuadricula({ callback }: CuadriculaProps) {
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
  } = useBuscarPokemones({ initialPage: 1, initialPageSize: 15 });
  if (isLoading) return <div>Cargando...</div>;
  if (isFetching) return <div>Refrescando...</div>;
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <input
        type="text"
        onKeyUp={(e) => searchPokemons(e.currentTarget.value)}
        className="bg-secondary-200 rounded-lg p-2 mb-4 flex-shrink-0"
        placeholder="Buscar:"
      />
      <div className="flex-1 overflow-y-auto">
        <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(theme(spacing.28),1fr))] p-2">
          {pokemones?.map((pokemon: Pokemon) => (
            <CardPokemon
              key={pokemon.id}
              pokemon={pokemon}
              callback={callback}
            />
          ))}
        </div>
      </div>
      {pokemones && (
        <div className="flex justify-center items-center mt-4 gap-2 flex-shrink-0 pb-2">
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
    </div>
  );
}
