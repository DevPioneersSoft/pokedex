
import { Select } from "@mantine/core";
import Cuadricula from "./features/cuadricula/components/Cuadricula";
import EjemploUseEffect from "./features/ejemplosHooks/EjemploUseEffect";
import HookUseState from "./features/ejemplosHooks/EjemploUseState";

import Header from "./features/layout/components/Header";
import { useState } from "react";

function App() {

  const [tipo, setTipo] = useState<string | null>(null)

  return (
    <>
      <div className="min-h-screen min-w-screen bg-gradient-to-br from-secondary-400 to-secondary-900 pb-10">
        <Header />
        {
          /* <Cuadricula /> */
        }
        <HookUseState />

        <Select
          data={["water", "fire", "grass"]}
          value={tipo}
          onChange={setTipo}
        />
        <EjemploUseEffect tipo={tipo ?? ""} />
      </div>
    </>
  );
}

export default App;
