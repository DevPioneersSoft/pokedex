import { useState } from "react";
import Cuadricula from "./features/cuadricula/components/Cuadricula";
import Header from "./features/layout/components/Header";
import type { Pokemon } from "./features/cuadricula/interfaces/Pokemon.interface";
import PokemonPreview from "./features/pokemonDetalles/components/PokemonPreview";
import { useFavoritos } from "./features/cuadricula/hooks/useFavoritos";

function App() {
  const [preview, setPreview] = useState<Pokemon | null>(null);
  const { toggleFav, agregarfavorito, favoritos } = useFavoritos();

  const handlePokemon = (pokemon: Pokemon) => {
    setPreview(pokemon)
    toggleFav(pokemon)
    agregarfavorito.mutate();
  }
  return (

    <>
      <div className="min-h-screen min-w-screen bg-gradient-to-br from-secondary-400 to-secondary-900 pb-10">
        <Header />
        <div className="grid grid-cols-12 ml-20 mt-10">
          <div className="col-span-5 z-20">
            <Cuadricula
              favoritos={favoritos}
              callback={handlePokemon}
            />
          </div>
          <div className="col-span-7">
            {
              preview &&
              <PokemonPreview {...preview} />
            }
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
