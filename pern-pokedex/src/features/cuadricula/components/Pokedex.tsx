import PokemonPreview from "../../pokemonDetalles/components/PokemonPreview";
import type { Pokemon } from "../interfaces/Pokemon.interface";
import Cuadricula from "./Cuadricula";
import { useState } from "react";
import { useFavoritos } from "../../pokemonDetalles/hooks/useFavoritos";

export default function Pokedex() {

const [preview, setPreview] = useState<Pokemon | null>(null)
  const {toggleFav, agregar} = useFavoritos()
  const handlePokemon = (p: Pokemon) => {
    setPreview(p);
    toggleFav(p);
    agregar.mutate()
  }

    return(       <div className="grid grid-cols-12 ml-20 mt-10">
          <div className="col-span-5 z-20">
            <Cuadricula
                callback={(pokemon: Pokemon) => handlePokemon(pokemon)}
                favOrTeam={1}
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