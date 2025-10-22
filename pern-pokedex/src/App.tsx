import { useState } from "react";
import Cuadricula from "./features/cuadricula/components/Cuadricula";
import Header from "./features/layout/components/Header";
import type { Pokemon } from "./features/cuadricula/interfaces/Pokemon.interface";
import PokemonPreview from "./features/pokemonDetalles/components/PokemonPreview";

function App() {
  const [preview, setPreview] = useState<Pokemon | null>(null);
  
  const handlePokemon = (p: Pokemon) => {
    setPreview(p);
    //
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-400 to-secondary-900 text-white">
      <Header />

      {/* Principal */}
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
          {/* Lista */}
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
            />
          </div>

          {/* Preview */}
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
              justify-center 
              items-center
              min-h-[400px]
            "
          >
            {preview ? (
              <PokemonPreview {...preview} />
            ) : (
              <p className="text-center text-lg text-white/80">
                Selecciona un Pokémon para ver sus detalles
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
