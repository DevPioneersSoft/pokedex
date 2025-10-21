import { useState } from "react";
import type { PokemonSimple } from "../../layout/components/pokemon.dummy";

export function usePokemonFavoritos(){
    const [favoritos, setFavoritos] = useState<PokemonSimple[]>([]);
    const agregarFavorito = (pokemon:PokemonSimple) => {
        setFavoritos((prev) => {
            if(prev.find((p) => p.id === pokemon.id)) return prev;
            return [...prev, pokemon]
        });
    }

    return {favoritos};
    
}