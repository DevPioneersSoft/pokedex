import {useState } from 'react'

import './App.css'
import { Button, Card, Select } from '@mantine/core'
import Header from './features/layout/components/Header'
// import Cuadricula from './features/cuadricula/components/Cuadricula'
import EjemploUseState from './features/ejemplosHooks/EjemploUseState'
import EjemploUseEffect from './features/ejemplosHooks/EjemploUseEffect'
import EjemploUseRef from './features/ejemplosHooks/EjemploUseRef'
import { EjemploUseReducer } from './features/ejemplosHooks/EjemploUseReducer'
// import type { PokemonSimple } from './features/cuadricula/components/pokemon.dummy'
// import type { Pokemon } from './features/interfaces/Pokemon.interface'
// import CardPokemon from './features/cuadricula/components/CardPokemon'
import { usePokemonesFavoritos, useBuscarPokemones } from './features/ejemplosHooks/hooks'

function App() {

 

  const { favoritos, agregarFavorito } = usePokemonesFavoritos()
  const {pokemons, cargando,} = useBuscarPokemones()
  

  const [tipo, setTipo] = useState<string | null>(null)
  return (
    <>
      <div className="min-h-screen max-w-screen bg-gradient-to-br from-secondary-400 to-secondary-900">
        <Header></Header>
        {/* <Cuadricula>

        </Cuadricula> */}
        <EjemploUseState />
        <Select
          data={["water", "fire", "grass"]}
          value={tipo}
          onChange={setTipo}
        >

        </Select>
        <EjemploUseEffect tipo={tipo ?? ""} />
        <EjemploUseRef />
        <EjemploUseReducer></EjemploUseReducer>
        
        <div>
          {cargando
          ? <h1>Esta cargando...</h1>
        :<Button onClick={() => agregarFavorito(pokemons[Math.floor(Math.random() * pokemons.length)])}>
          Agregar a Favoritos
        </Button> }
        </div>

            <div className='bg-secondary-200 w-md content-center '>
              <h1>Pokemons Favoritos</h1>
          {favoritos.map((pokemon) => (
          <Card key={pokemon.id} className="uppercase text-2xl text-left mx-5 my-5 w-sm">
            {pokemon.nombre} (ID: {pokemon.id}) 
              <img src={pokemon.imagen}></img>
           
          </Card>
          
        ))}
        </div>
      </div>

    </>
  )
}

export default App
