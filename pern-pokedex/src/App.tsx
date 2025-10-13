import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Saludo from "./features/cuadricula/components/Cuadricula";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div onMouseEnter={() => console.log("mouse enter")}>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Saludo nombre={<h1>Juan</h1>} apellido="Escobar">
        <h1>Hola Mundo</h1>
        "texto puro"
      </Saludo>
      <Saludo nombre="Ana">
        <h1>Hola Mundo 2</h1>
      </Saludo>
      <Saludo nombre="Pedro" />
    </>
  );
}

export default App;
