import { useState } from "react"
// import type { PokemonSimple } from "../../cuadricula/components/pokemon.dummy"
import type { Pokemon } from "../../interfaces/Pokemon.interface"

export function usePokemonesFavoritos(){
    const [favoritos, setFavoritos ] = useState<Pokemon[]>([])
    const agregarFavorito = (pokemon: Pokemon) => {
        setFavoritos((prev) => {
            if(prev.find((p) => p.id === pokemon.id) ) return prev;
             return [...prev, pokemon];
        })
    }
    return {favoritos, agregarFavorito}
}