// import { Select } from "@mantine/core";
// import Cuadricula from "./features/cuadricula/components/Cuadricula";
// import EjemploUseEffect from "./features/ejemplosHooks/EjemploUseEffect";
// import HookUseState from "./features/ejemplosHooks/EjemploUseState";
import { EjemploUseReducer } from "./features/ejemplosHooks/EjemploUseReducer";
import Header from "./features/layout/components/Header";
// import { useEffect, useState } from "react";
// import type { Pokemon } from "./interfaces/Pokemon.interface";
import {
  usePokemonesFavoritos,
  useBuscarPokemones,
} from "./features/ejemplosHooks/hooks";
// import EjemploUseRef from "./features/ejemplosHooks/EjemploUseRef";

function App() {
  // const [tipo, setTipo] = useState<string | null>(null);
  const { favoritos, agregarFavorito } = usePokemonesFavoritos();
  const { pokemons, cargando, error } = useBuscarPokemones();

  // console.log(pokemons);

  console.log(favoritos);

  if (cargando) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="min-h-screen min-w-screen bg-gradient-to-br from-secondary-400 to-secondary-900 pb-10">
        <Header />
        {/* <Cuadricula /> */}
        {/* <HookUseState /> */}
        {/* <EjemploUseRef /> */}

        {/* <Select
          data={["water", "fire", "grass"]}
          value={tipo}
          onChange={setTipo}
        /> */}
        {/* <EjemploUseEffect tipo={tipo ?? ""} /> */}
        <EjemploUseReducer />
        <button
          onClick={() =>
            agregarFavorito(
              pokemons[Math.floor(Math.random() * pokemons.length)]
            )
          }
          className="mt-5 p-3 bg-blue-500 text-white rounded-lg"
        >
          Agregar Favorito
        </button>
        {pokemons.length > 0 && (
          <div className="mt-5 p-4 bg-white rounded-lg max-w-md mx-auto">
            <h3 className="text-lg font-bold mb-3">Pokémons Favoritos:</h3>
            <ul className="list-disc list-inside">
              {favoritos.map((pokemon) => (
                <li key={pokemon.id} className="capitalize">
                  {pokemon.nombre} (ID: {pokemon.id})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
