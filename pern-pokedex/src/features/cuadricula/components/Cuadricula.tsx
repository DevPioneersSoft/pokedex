import { useState } from "react";
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
  } = useBuscarPokemones({ initialPage: 1, initialPageSize: 30 });


  const [busqueda, setBusqueda] = useState("");

  const handleSearch = () => {
    searchPokemons(busqueda.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (isFetching) return <div>Refrescando...</div>;

  return (
    <>
      {/* Busqueda */}
      <div className="flex gap-2 items-center mb-4 w-full max-w-md mx-auto">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          className="bg-white/20 placeholder-white/60 text-white w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
          placeholder="🔍 Buscar Pokémon..."
        />
        <button
          onClick={handleSearch}
          className="bg-primary-400 hover:bg-primary-500 text-white font-semibold rounded-lg px-4 py-2 transition-colors"
        >
          Buscar
        </button>
      </div>

      {/* Pokemones */}
      <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(theme(spacing.28),1fr))] rounded-2xl p-6">
        {pokemones?.map((pokemon: Pokemon) => (
          <CardPokemon key={pokemon.id} pokemon={pokemon} callback={callback} />
        ))}
      </div>

      {/* Paginacion */}
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