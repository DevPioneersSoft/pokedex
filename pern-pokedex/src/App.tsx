import { useState } from "react";
import Cuadricula from "./features/cuadricula/components/Cuadricula";
import Header from "./features/layout/components/Header";
import type { Pokemon } from "./features/cuadricula/interfaces/Pokemon.interface";
import PokemonPreview from "./features/pokemonDetalles/components/PokemonPreview";

function App() {
  const [preview, setPreview] = useState<Pokemon | null>(null);
  return (
    <>
      <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-secondary-400 to-secondary-900 flex flex-col">
        <Header />
        <div className="grid grid-cols-12 ml-20 mt-10">
          <div className="col-span-5 z-20">
            <Cuadricula callback={(pokemon: Pokemon) => setPreview(pokemon)} />
          </div>
          <div className="col-span-7">
            {preview && <PokemonPreview {...preview} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
