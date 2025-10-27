import { create } from "zustand";
import type { Pokemon } from "../cuadricula/interfaces/Pokemon.interface"; 

type EquipoState = {
    equipo: Pokemon[],
    equipoDraft: Pokemon[];
    addPokemon: (pokemon:Pokemon) => void;
    deletePokemon: (idPokemon:number) => void;
    setDraft: (pokemonList: Pokemon[]) => void;
    setEquipo: (pokemonList: Pokemon[]) => void;
    resetEquipo: (pokemonList: Pokemon[]) => void;
    resetDraft:() => void;
    
    
}

export const useEquipoStore = create<EquipoState>((set) =>({
    equipoDraft:[],
    equipo : [],
    addPokemon: (pokemon) =>
        set((state) =>{
            if(state.equipoDraft.length == 6) return state;
            if(state.equipoDraft.some((p) => p.id === pokemon.id)) return state;
            return {equipoDraft:[...state.equipoDraft, pokemon]};
        }),
     deletePokemon:(idPokemon) =>
        set((state) =>({
            equipoDraft: state.equipoDraft.filter((p) => p.id !== idPokemon),
        })),
        setDraft: (pokemonList) => set({equipoDraft: pokemonList}),
        resetDraft: () => set({equipoDraft:[]}),
        setEquipo: (pokemonList) => set({equipo: pokemonList}),
        resetEquipo: () => set({equipo:[]}),
}));
