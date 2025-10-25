import { useState } from "react";
import PokemonPreview from "../pokemonDetalles/components/PokemonPreview";
import Cuadricula from "./components/Cuadricula";
import type { Pokemon } from "./interfaces/Pokemon.interface";

export default function Pokedex() {

    const [preview, setPreview] = useState<Pokemon | null>(null)

    const handlePokemon = (pokemon : Pokemon) => {
    setPreview(pokemon);
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
  )}
