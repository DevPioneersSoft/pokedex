import type { PokemonSimple } from "../../cuadricula/componentes/pokemon.dummy";

interface EstadoEquipo {
    equipo: PokemonReducer[];
    pokemonActivo: PokemonReducer['id'] | null;
    enBatalla: boolean;
}

export interface PokemonReducer extends PokemonSimple {
    vida: number;
}

export const estadoInicial: EstadoEquipo = {
    equipo: [],
    pokemonActivo: null,
    enBatalla: false,
}

type ActionTypes = | {type: 'AGREGAR_POKEMON', payload: PokemonReducer} 
                   | {type: 'REMOVER_POKEMON', payload: PokemonReducer['id']}
                   | {type: 'SELECCIONAR_POKEMON_ACTIVO', payload: PokemonReducer['id']}
                   | {type: 'INICIAR_BATALLA'}
                   | {type: 'TERMINAR_BATALLA'};

export function equipoReducer(state: EstadoEquipo, action: ActionTypes) {
    switch(action.type) {
        case 'AGREGAR_POKEMON':
            if (state.equipo.length >= 6){
                alert("No puedes agregar más de 6 pokemones a tu equipo");
                return state;
            }
            if (state.equipo.some(pokemon => pokemon.id === action.payload.id)) {
                alert("Este pokemon ya está en tu equipo");
                return state;
            }
            return {...state, equipo: [...state.equipo, action.payload]};
        case 'REMOVER_POKEMON':
            return {...state, equipo: state.equipo.filter(item => item.id !== action.payload)};
        case 'SELECCIONAR_POKEMON_ACTIVO':
            return {...state, pokemonActivo: action.payload};   
        case 'INICIAR_BATALLA':
            if(!state.pokemonActivo) {
                alert("Debes seleccionar un pokemon activo para iniciar la batalla");
                return state;
            }
            return {...state, enBatalla: true};
        case 'TERMINAR_BATALLA':
            if(!state.enBatalla) {
                alert("No hay una batalla en curso");
                return state;
            }
            return {
                ...state, 
                enBatalla: false,
                equipo: state.equipo.map(pokemon => {
                    if (pokemon.id === state.pokemonActivo) {
                        return {
                            ...pokemon, 
                            vida: Math.max(10, pokemon.vida - Math.floor(Math.random() * 30 + 10))
                        };
                    }
                    return pokemon;
                })
            };
        default:
            return state;
    }
}   