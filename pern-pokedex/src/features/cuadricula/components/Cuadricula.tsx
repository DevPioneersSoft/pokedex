import { useBuscarPokemones } from "../hooks/useBuscarPokemones.hook";
import { useFavoritos } from "../hooks/useFavorito";
import type { Pokemon } from "../interfaces/Pokemon.interface";
import CardPokemon from "./CardPokemon";

interface CuadriculaProps {
  callback?: (pokemon: Pokemon) => void;
}

export default function Cuadricula({ callback }: CuadriculaProps) {
  const { favoritos } = useFavoritos();

  const {
    pokemones,
    isLoading,
    isFetching,
    prevPage,
    nextPage,
    page,
    totalPages,
    searchPokemones,
  } = useBuscarPokemones({ initialPageSize: 18, favoritos });
  if (isLoading) return <div>Cargando...</div>;
  if (isFetching) return <div>Refrescando...</div>;
  return (
    <>
      <input
        type="text"
        onKeyUp={(e) => searchPokemones(e.currentTarget.value)}
        className="bg-secondary-200 rounded-lg p-2"
        placeholder="Buscar:"
      />
      <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(theme(spacing.28),1fr))] rounded-2xl p-6">
        {pokemones?.map((pokemon: Pokemon) => (
          <CardPokemon key={pokemon.id} pokemon={pokemon} callback={callback} />
        ))}
      </div>
      {pokemones && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            className="px-3 py-1 rounded bg-primary-200 disabled:opacity-50"
            onClick={() => prevPage()}
          >
            Anterior
          </button>
          <span>
            Página {page} de {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded bg-primary-200 disabled:opacity-50"
            onClick={() => nextPage()}
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  );
}
