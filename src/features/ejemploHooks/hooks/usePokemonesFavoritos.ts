import {useState} from 'react';
import type { PokemonSimple } from '../../../../pokemon.dummy';

export const usePokemonesFavoritos = () => {
    const [pokemonesFavoritos, setPokemonesFavoritos] = useState<PokemonSimple[]>([]);
    
    const agregarPokemonFavorito = (pokemon: PokemonSimple) => {
        setPokemonesFavoritos((prev) =>{
            if (prev.find(p => p.id === pokemon.id)) {
                return prev;
            }
            return [...prev, pokemon];
        });
    }

    return { pokemonesFavoritos, agregarPokemonFavorito };
}