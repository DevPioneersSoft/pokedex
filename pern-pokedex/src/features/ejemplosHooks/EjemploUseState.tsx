import { useState } from 'react'

export default function EjemploUseState() {
    /*let numero = 5;
    
    const incrementar = () =>{
        numero += 1;
        console.log(numero);
    }*/
    
    const [numeroPokebolas, setNumeroPokebolas] = useState(0);
    
    const incrementar = () => {
        //console.log(numeroPokebolas);
        setNumeroPokebolas(numeroPokebolas + 1);
        numero = numero + 1;
        //console.log(numeroPokebolas);
    }

    let numero = 0;

  return (
    <div>
        <button onClick={incrementar} className='bg-primary-500 text-white px-4 py-2 rounded-lg m-4 hover:bg-primary-600 transition'>Incrementar</button>
        <span className='text-white font-bold text-2xl'>{numeroPokebolas}</span>
    </div>
  )
}
