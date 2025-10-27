import { useState } from "react";
import PokemonPreview from "../../pokemonDetalles/components/PokemonPreview";
import type { Pokemon } from "../interfaces/Pokemon.interface";
import Cuadricula from "./Cuadricula";

export default function Pokedex() {
    const [preview, setPreview] = useState<Pokemon | null>(null)

    return (
        <div className="grid grid-cols-12 ml-20 mt-10">
            <div className="col-span-5 z-20">
                <Cuadricula
                    callback={(pokemon: Pokemon) => setPreview(pokemon)}
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
