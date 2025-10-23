import { useState } from "react";
import Cuadricula from "./features/cuadricula/components/Cuadricula";
import Header from "./features/layout/components/Header";
import type { Pokemon } from "./features/cuadricula/interfaces/Pokemon.interface";
import PokemonPreview from "./features/pokemonDetalles/components/PokemonPreview";
import useFavoritos from "./features/cuadricula/hooks/useFavoritos";

function App() {
  const [preview, setPreview] = useState<Pokemon | null>(null)
  const {toggleFav, agregar} =  useFavoritos()
  const handlePokemon = (p: Pokemon) => {
    setPreview(p);
    toggleFav(p);
    agregar.mutate()
  }
  return (

    <>
      <div className="min-h-screen min-w-screen bg-gradient-to-br from-secondary-400 to-secondary-900 pb-10">
        <Header />
        <div className="grid grid-cols-12 ml-20 mt-10">
          <div className="col-span-5 z-20">
            <Cuadricula
              callback={(pokemon: Pokemon) => handlePokemon(pokemon)}
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