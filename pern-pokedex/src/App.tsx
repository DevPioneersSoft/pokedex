
import './App.css'
import Header from './features/layout/components/Header'
import Cuadricula from './features/cuadricula/components/Cuadricula'
import { useState } from 'react'
import type { Pokemon } from './features/interfaces/Pokemon.interface'
import PokemonPreview from './features/pokemonDetallado/PokemonPreview';

function App() {

  const [preview, setPreview] = useState<Pokemon | null>(null)

  return (
    <>
      <div className="min-h-screen max-w-screen bg-gradient-to-br from-secondary-400 to-secondary-900">
        
        <Header></Header>
        <div className='grid grid-cols-12 ml-20 mt-10' >
          <div className='col-span-5 z-20'>
          <Cuadricula
          callback={(pokemon: Pokemon) => setPreview(pokemon)}>
        </Cuadricula>
        </div>
        <div className='col-span-7'>
        {
          preview && <PokemonPreview {...preview}/>
        }
        </div>
        </div>
        </div>
    </>
  )
}

export default App
