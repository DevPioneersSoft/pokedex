import { useState } from "react";
import Cuadricula from "./features/cuadricula/components/Cuadricula";
import Header from "./features/layout/components/Header";
import { BatallaPokemon } from "./features/cuadricula/components/callBack";
import { pokemonDummies } from "./features/cuadricula/components/pokemon.dummy";

const pokemon1 = { ...pokemonDummies[0], vida: 100, vidaActual: 100 };
const pokemon2 = { ...pokemonDummies[1], vida: 80, vidaActual: 80 };

let numero2 = 0;

function App() {
  const [numero, setNumero] = useState(0);

  console.log("Render App");

  console.log("Numero2:", numero2);
  numero2 = 10;
  console.log("Numero2 modificado:", numero2);
  return (
    <>
      <div className="min-h-screen min-w-screen bg-gradient-to-br from-secondary-400 to-secondary-900 pb-10">
        <Header />
        <Cuadricula />

        <h1>{numero}</h1>
        <button onClick={() => setNumero(numero + 1)}>Incrementar</button>
        <BatallaPokemon pokemon1={pokemon1} pokemon2={pokemon2} />
      </div>
    </>
  );
}

export default App;
