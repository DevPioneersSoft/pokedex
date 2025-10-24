import { useState } from 'react'
import Cuadricula from '../../cuadricula/components/Cuadricula'
import type { Pokemon } from '../../cuadricula/interfaces/Pokemon.interface'
import PokemonPreview from '../../pokemonDetalles/components/PokemonPreview'

export default function Pokedex() {
    const [preview, setPreview] = useState<Pokemon | null>(null);
  const handlePokemon = (poke: Pokemon) => {
    setPreview(poke);
  }
  return (
    <div className="grid grid-cols-12 ml-20 mt-10">
              <div className="col-span-5 z-20">
                <Cuadricula
                  callback={(pokemon: Pokemon) => handlePokemon(pokemon)}
                />
              </div>
              <div className="col-span-7">
                {
                  preview &&
                  <PokemonPreview {...preview} />
                }
              </div>
            </div>
  )
}
