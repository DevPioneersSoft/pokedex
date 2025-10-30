import { useState } from "react";
import Cuadricula from "./features/cuadricula/components/Cuadricula";
import Header from "./features/layout/components/Header";
import type { Pokemon } from "./features/cuadricula/interfaces/Pokemon.interface";
import PokemonPreview from "./features/pokemonDetalles/components/PokemonPreview";
import { Outlet } from "react-router-dom";

function App() {
  const [preview, setPreview] = useState<Pokemon | null>(null)

  return (

    <>
      <div className="min-h-screen min-w-screen bg-gradient-to-br from-secondary-400 to-secondary-900 pb-10">
        <Header />
  <Outlet />
      </div>
    </>
  );
}

export default App;
