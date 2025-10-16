import { useEffect, useRef, useState } from "react";

export default function EjemploUseRef() {
  const [numero, setNumero] = useState(0);

  const numeroRef = useRef(0);
  console.log("Render");

  const incrementar = () => {
    numeroRef.current = numeroRef.current + 1;
    setNumero(numero + 1);
    console.log("Valor actual:", numeroRef.current);
  };

  //------------------------------------------------------

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => inputRef.current?.focus(), []);
  return (
    <>
      <button onClick={incrementar}>Incrementar</button> <br />
      {numeroRef.current}
      <input
        ref={inputRef}
        placeholder="Escribe aqui..."
        className="bg-white p-4 m-4"
      ></input>
    </>
  );
}
