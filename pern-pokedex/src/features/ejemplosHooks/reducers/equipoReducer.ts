import { PokemonSimple } from "../../cuadricula/components/pokemon.dummy";

interface EstadoEquipo {
    equipo: PokemonReducer[]
    pokemonActivo: PokemonReducer['id'] | null
    enBatalla: boolean
}

export interface PokemonReducer extends PokemonSimple {
    vida: number
}

export const estadoInicial: EstadoEquipo = {
    equipo: [],
    pokemonActivo: null,
    enBatalla: false
}

type ActionTypes = { type: "AGREGAR_POKEMON", payload: PokemonReducer }
    | { type: "REMOVER_POKEMON", payload: PokemonReducer['id'] }
    | { type: "SELECCIONAR_POKEMON_ACTIVO", payload: PokemonReducer['id'] }
    | { type: "INICIAR_BATALLA" }
    | { type: "TERMINAR_BATALLA" }

export function equipoReducer(state: EstadoEquipo, action: ActionTypes) {
    switch (action.type) {
        case "AGREGAR_POKEMON":
            if (state.equipo.length >= 6) {
                alert("El equipo ya está lleno")
                return state
            }
            if (state.equipo.some((p) => p.id === action.payload.id)) {
                alert("Este Pokémon ya está en tu equipo.")
                return state
            }
            return {
                ...state,
                equipo: [...state.equipo, action.payload]
            }
        case "REMOVER_POKEMON":
            return {
                ...state,
                equipo: state.equipo.filter(pokemon => pokemon.id !== action.payload),
                pokemonActivo: action.payload ? null : state.pokemonActivo
            }
        case "SELECCIONAR_POKEMON_ACTIVO":
            return {
                ...state,
                pokemonActivo: action.payload
            }
        case "INICIAR_BATALLA":
            if (!state.pokemonActivo) {
                alert("Seleeciona un pokemon activo para empezar")
                return state
            }
            return {
                ...state,
                enBatalla: true
            }
        case "TERMINAR_BATALLA":
            return {
                ...state,
                enBatalla: false,
                equipo: state.equipo.map(pokemon => {
                    if (pokemon.id === state.pokemonActivo) {
                        return {
                            ...pokemon,
                            vida: Math.max(10, pokemon.vida - Math.floor(Math.random() * 30 + 10))
                        }
                    }
                    return pokemon
                })
            }
        default: return state
    }

}