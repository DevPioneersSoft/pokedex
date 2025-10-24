import { create } from "zustand";
import type { Pokemon } from "../../cuadricula/interfaces/Pokemon.interface";

type EquipoStore = {
    equipo: Pokemon[],
    addPokemon: (pokemon: Pokemon) => void,
    removePokemon: (pokemonId: number) => void,
    resetEquipo: () => void
}
export const useEquipoStore = create<EquipoStore>()((set) => ({
    equipo: [],
    addPokemon: (pokemon) => {
        set((state) => {
            if (state.equipo.length === 6) return state;
            if (state.equipo.find((p) => p.id === pokemon.id)) return state;
            return { equipo: [...state.equipo, pokemon] };
        })
    },
    removePokemon: (pokemonId) => {
        set(state => ({ equipo: state.equipo.filter(p => p.id !== pokemonId) }))
    },
    resetEquipo: () => set(state => ({ equipo: [] }))
}))