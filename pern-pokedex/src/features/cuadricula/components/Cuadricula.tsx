import { useState } from "react";
import { useFavoritos } from "../../layout/hooks/useFavoritos";
import { useBuscarPokemones } from "../hooks/useBuscarPokemones.hook";
import type { Pokemon } from "../interfaces/Pokemon.interface";
import CardPokemon from "./CardPokemon";
import ButtonCustom from "../../layout/components/ButtonCustom";

interface CuadriculaProps {
  callback?: (pokemon: Pokemon) => void,
  registrarFavoritos?: boolean
}

export default function Cuadricula({ callback , registrarFavoritos = true}: CuadriculaProps) {

  const {favoritos, agregar, toggleFavorito} = useFavoritos();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (p: Pokemon) => {
    setSelectedId(p.id);
    callback?.(p);
  };

  const onClickPokemon = async (pokemon: Pokemon) => {
    if (callback) {
      callback(pokemon);
    }
    if (!registrarFavoritos) return;
    toggleFavorito(pokemon);
    await agregar.mutateAsync();
  };

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
  } = useBuscarPokemones({ initialPage: 1, initialPageSize: 30,  favoritos: favoritos });
  if (isLoading) return <div>Cargando...</div>;
  if (isFetching) return <div>Refrescando...</div>;
  return (
    <>
      <input
        type="text"
        onKeyUp={(e) => searchPokemons(e.currentTarget.value)}
        className="bg-secondary-200 rounded-lg p-2"
        placeholder="Buscar:"
      />

      <ButtonCustom
        label={agregar.isPending ? "Guardando..." : "Agregar a Favoritos"}
        color="secondary"
        className={`px-2 m-2 ${agregar.isPending ? "opacity-50 pointer-events-none" : ""}`}
        onClick={() => agregar.mutate()}
      />
      <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(theme(spacing.28),1fr))] rounded-2xl p-6">

        {pokemones?.map((pokemon: Pokemon) => (
          <CardPokemon
            key={pokemon.id}
            pokemon={pokemon}
            onSelected={selectedId === pokemon.id}
            callback={() => onClickPokemon(pokemon)} // Use onClickPokemon here
            isFav={favoritos.includes(pokemon.id)}
            onToggleFavorito={toggleFavorito}
          />
        ))}
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
