import { create } from "zustand";
import type { Pokemon } from "../../cuadricula/interfaces/Pokemon.interface";

type EquipoState = {
    equipo: Pokemon[];
    equipoDraft: Pokemon[];
    addPokemon: (pokemon: Pokemon) => void;
    deletePokemon: (pokemonId: number) => void;
    setDraft: (equipoList: Pokemon[]) => void;
    setEquipo: (equipoList: Pokemon[]) => void;
    resetDraft: () => void;
    resetEquipo: () => void;
}


export const equipoUserStore = create<EquipoState>((set) => ({
    equipoDraft: [],
    equipo: [],
    addPokemon: (pokemon) =>
        set((state) => {
            if (state.equipoDraft.length >= 6) return state;
            if (state.equipoDraft.some(p => p.id === pokemon.id)) return state;
            return { equipoDraft: [...state.equipoDraft, pokemon] }
        }),
    deletePokemon: (idPokemon) =>
        set((state) => ({
            equipoDraft: state.equipoDraft.filter(p => p.id !== idPokemon)
        })),
    setDraft: (pokemonList) => set({ equipoDraft: pokemonList }),
    resetDraft: () => set({ equipoDraft: [] }),
    setEquipo: (pokemonList) => set({ equipo: pokemonList }),
    resetEquipo: () => set({ equipo: [] }),
}));