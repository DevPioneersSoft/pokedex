import { useEffect, useRef } from "react"


export default function EjemploUseRef() {

    const numeroRef = useRef(0)

    const incrementar = () => {
        numeroRef.current = numeroRef.current +1
        console.log("Valor actual", numeroRef.current)
    }

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => inputRef.current?.focus(), [])
  return (
    <div>
      <button onClick={incrementar}>Incrementar</button> <br/>
        {numeroRef.current}
        <input ref={inputRef} placeholder="Esribe algo aqui..." className="bg-white p-4 m-4"></input>
    </div>
    
  )
}
