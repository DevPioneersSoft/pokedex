import { useState } from "react";
import Cuadricula from "./Cuadricula";
import PokemonPreview from "../../pokemonDetalles/components/PokemonPreview";
import type { Pokemon } from "../interfaces/Pokemon.interface";
import { useFavoritos } from "../../pokemonDetalles/hooks/useFavoritos";

export default function Pokedex() {

 const [preview, setPreview] = useState<Pokemon | null>(null);
 const {toggleFav} = useFavoritos();
  const handlePokemon = (p:Pokemon) => {
    setPreview(p);
    toggleFav(p);
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
