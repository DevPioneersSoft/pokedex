import { useState } from "react"



let numero = 0

export default function EjemploUseState() {

const [numeroPokebolas, setNumeroPokebolas] = useState(0)


const incrementar = () =>{
 setNumeroPokebolas(numeroPokebolas+1)
}
  return (
    <>
    <div>
       <button onClick={incrementar}>Incrementar</button> <br/>
        {numeroPokebolas}
    </div>
    </>
  )
}
