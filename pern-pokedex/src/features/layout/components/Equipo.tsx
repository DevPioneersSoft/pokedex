import { useState } from "react";
import Cuadricula from "../../cuadricula/components/Cuadricula";
import type { Pokemon } from "../../cuadricula/interfaces/Pokemon.interface";

export default function Equipo() {
  const [equipo, setEquipo] = useState<Pokemon[]>([]);
  let LIMITE = 12;

  const handlePokemon = async (pokemon: Pokemon) => {
    setEquipo((prev) => {
        if (prev.find((p) => pokemon.id === p.id)) return prev;
        if (prev.length >= LIMITE) return prev;
        return [...prev, pokemon];
    });
  };

  const quitarPokemon = (id: number) => {
    setEquipo((prev) => prev.filter((p) => p.id !== id));
  };

  return (
  <div className="container mx-auto px-4 py-8">
      <div
      className="
          grid 
          grid-cols-1 
          lg:grid-cols-12 
          gap-6 
          transition-all
      "
      >
          {/* Cuadricula */}
          <div
              className="
              lg:col-span-5
              order-2 lg:order-1
              bg-white/10
              backdrop-blur-sm
              rounded-2xl
              shadow-lg
              p-4
              overflow-hidden
              "
          >
              <Cuadricula
              callback={(pokemon: Pokemon) => handlePokemon(pokemon)}
              permitirFavoritos={false}
              />
          </div>

          {/* Equipo */}
          <div
              className="
              lg:col-span-7
              order-1 lg:order-2
              bg-white/10
              backdrop-blur-sm
              rounded-2xl
              shadow-lg
              p-6
              flex 
              flex-wrap
              justify-center 
              items-center
              gap-4
              min-h-[400px]
              "
          >
              {equipo.length > 0 ? (
              equipo.map((pokemon) => (
                  <div
                  key={pokemon.id}
                  className="relative flex flex-col items-center bg-white/10 p-4 rounded-xl shadow-md w-32"
                  >
                  <img
                      src={pokemon.imagen}
                      alt={pokemon.nombre}
                      className="w-20 h-20 object-contain mb-2"
                  />
                  <p className="text-center font-semibold">{pokemon.nombre}</p>
                  <button
                      onClick={() => quitarPokemon(pokemon.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                      ✕
                  </button>
                  </div>
              ))
              ) : (
              <p className="text-center text-white/70">
                  `Selecciona hasta {LIMITE} pokemones para tu equipo`
              </p>
              )}
          </div>
      </div>
  </div>
  );
}
