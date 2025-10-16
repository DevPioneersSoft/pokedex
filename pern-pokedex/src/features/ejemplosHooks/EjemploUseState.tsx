import { useState, useContext } from "react";
import { EntrenadorContext } from "../../context/EntrenadorContext";

let numero = 0;
export default function EjemploUseState() {
  const context = useContext(EntrenadorContext);
  console.log("Hool State: ", context);
  //   context.ganarMedalla();
  //   console.log(context.entrenador);
  /*let numero = 0

    const incrementar = () => {
    ///numero = numero + 1
    numero++
    console.log(numero)
    }*/

  const [numeroPokebolas, setNumeroPokebolas] = useState(0);

  const incrementar = () => {
    //console.log(numeroPokebolas)
    setNumeroPokebolas(numeroPokebolas + 1);
    numero = numero + 1;
    //console.log(numeroPokebolas)
  };
  //console.log("Render")
  console.log(numero);

  return (
    <div>
      <button onClick={incrementar}>Incrementar</button> <br />
      {numeroPokebolas}
    </div>
  );
}
