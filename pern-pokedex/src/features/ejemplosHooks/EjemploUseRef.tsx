import { useEffect, useRef, useState } from "react";

export default function EjemploUseRef() {  
  const numeroRef = useRef(0);
  console.log("renderizado");

  const incrementar = () => {
    numeroRef.current = numeroRef.current + 1;
    console.log(numeroRef.current);
  }

  //---------------------------------------------------------------------------

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
        inputRef.current.focus();
    }
  }, []);
  
  return (
    <div>
      <button onClick={incrementar}>Incrementar</button>
      <p>Número: {numeroRef.current}</p>

      <input 
        ref={inputRef} 
        placeholder="Escribe aqui"
        type="text" 
        className="bg-amber-50 ml-4 p-2 rounded-lg"
      />
    </div>
  )
}
