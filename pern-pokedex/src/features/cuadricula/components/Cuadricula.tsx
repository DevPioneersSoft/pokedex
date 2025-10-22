import { Input } from "@mantine/core";
import { useBuscarPokemones } from "../../ejemplosHooks/hooks"
import CardPokemon from "./CardPokemon";
import type { Pokemon } from "../../interfaces/Pokemon.interface";
import useFavoritos from "./hooks/useFavoritos";

interface CuadriculaProps{

  
  callback?: (pokemon: Pokemon) => void

}
  const {favoritos} = useFavoritos()

export default function Cuadricula({callback}: CuadriculaProps) {
  const { pokemones, isLoading, refetch, isFetching, nextPage, prevPage, searchPokemons } = useBuscarPokemones(
    {initialPage: 1, favoritos:favoritos}
  );


  return (
    <>
      <div className="min-h-screen p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6 p-4 bg-gray-100 rounded-lg">
          <div className="w-full md:w-auto">

            <Input
              name="search"
              type="text"
              placeholder="Buscar Pokémon..."
              className="w-full md:w-64"
              onKeyUp={(e) => searchPokemons(e.currentTarget.value)} />
          </div>

          <div className="flex gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => refetch()}>
              Refrescar
            </button>
          </div>

          <div className="flex gap-2">
            <button
              className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => { prevPage() }}>
              Página Anterior
            </button>
            <button
              className="bg-emerald-600 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded"
              onClick={() => { nextPage() }}>
              Siguiente Página
            </button>
          </div>
        </div>

        {/* Estado de carga */}
        {isFetching && (
          <div className="text-center py-4 text-blue-500 font-semibold">
            Refrescando...
          </div>
        )}

        {/* Grid autoajustable de pokémones */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-2 justify-items-center">
          {(isLoading || isFetching) ? (
            <div className="col-span-full text-center py-8">
              <div className="grid gap-1">
                <div className="flex items-center justify-center">
                  <svg className="animate-spin border-indigo-300"
                    xmlns="http://www.w3.org/2000/svg" width="56" height="56"
                    viewBox="0 0 56 56" fill="none">
                    <circle cx="28" cy="28" r="26" stroke="#EBD402"
                      stroke-width="4" stroke-dasharray="12 12" />
                  </svg>
                </div>
                <span
                  className="text-black text-2xl font-normal leading-snug">CARGANDO...</span>
              </div>

            </div>
          ) : (
            pokemones?.map((pokemon: Pokemon, index) => (
              <CardPokemon
                key={pokemon.id || index}
                pokemon={pokemon}
                callback={callback}
                // nombre={pokemon.nombre}
                // imagen={pokemon.imagen}
              />
            ))
          )}
        </div>

        {/* Mensaje cuando no hay resultados */}
        {!isLoading && !isFetching && (!pokemones || pokemones.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            No se encontraron pokémones
          </div>
        )}
      </div>
    </>
  );
}