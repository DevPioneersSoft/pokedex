import { useContext } from 'react'
import type { PokemonSimple } from './pokemon.dummy'
import { EntrenadorContext } from '../../../context/EntrenadorContext'
import type { Pokemon } from '../../interfaces/Pokemon.interface';

interface CardPokemonProps {
  pokemon: Pokemon,
  callback?: (pokemon: Pokemon) => void
}

export default function CardPokemon({pokemon, callback} : CardPokemonProps)  {

  const {nombre, imagen} = pokemon
  return (
    <div key={nombre} 
      className='bg-white/50 backdrop-blur-md rounded-lg p-4 flex flex-col items-center' 
      onClick={() => {
        if(callback) callback(pokemon)
      }}
    >
      <h2>{nombre}</h2>
      <img src={imagen} alt={nombre} />
    </div>
  )
}
