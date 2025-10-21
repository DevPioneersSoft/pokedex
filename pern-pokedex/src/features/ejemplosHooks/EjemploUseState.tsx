import React, { useState } from 'react'

export default function HookUseState() {
      const [numeroPokebolas, setNumeroPokembolas] = useState(0);
    
      const incrementar = () => {
        // console.log(numeroPokebolas)
        setNumeroPokembolas(numeroPokebolas + 1)
        // console.log(numeroPokebolas)
      }
  return (
    <div>
        <button onClick={incrementar}>Incrementar</button>
        {numeroPokebolas}
    </div>
  )
}
