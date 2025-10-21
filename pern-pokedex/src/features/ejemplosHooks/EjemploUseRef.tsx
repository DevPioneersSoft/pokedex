import React, { useRef } from 'react'

export default function EjemploUseRef() {

  const numeroRef = useRef(0);
  console.log("RENDER")

  const incrementar = () => {
    numeroRef.current = numeroRef.current + 1;
    console.log("Valor actual:", numeroRef.current)
  }
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
        <button onClick={incrementar}>Incrementar</button>
        {numeroRef.current}

        <input ref={inputRef} placeholder='Escribe aqui...' className='bg-white px-4'></input>
    </div>
  )
}
