import type { PokemonSimple } from "../../cuadricula/components/pokemon.dummy";

// Extendemos la interfaz PokemonSimple para incluir vida
export interface PokemonReducer extends PokemonSimple {
  vida: number;
}

// Estado del equipo
interface EstadoEquipo {
  equipo: PokemonReducer[];
  pokemonActivo: number | null;
  enBatalla: boolean;
}

// Estado inicial del equipo
export const estadoInicial: EstadoEquipo = {
  equipo: [],
  pokemonActivo: null,
  enBatalla: false,
};

// Tipos de acciones
type ActionTypes =
  | { type: "AGREGAR_POKEMON"; payload: PokemonReducer }
  | { type: "REMOVER_POKEMON"; payload: number }
  | { type: "SELECCIONAR_POKEMON_ACTIVO"; payload: number }
  | { type: "INICIAR_BATALLA" }
  | { type: "TERMINAR_BATALLA" };

/**
 * REDUCER para manejar el equipo de Pokémon
 *
 * Un reducer es una función pura que:
 * - Recibe el estado actual y una acción
 * - Retorna un nuevo estado
 * - NO modifica el estado original
 */
export function equipoReducer(
  state: EstadoEquipo,
  action: ActionTypes
): EstadoEquipo {
  switch (action.type) {
    case "AGREGAR_POKEMON":
      // Máximo 6 pokémon en el equipo
      if (state.equipo.length >= 6) {
        alert("¡El equipo está lleno! Máximo 6 Pokémon.");
        return state;
      }
      // Verificar que no exista ya en el equipo
      if (state.equipo.some((p) => p.id === action.payload.id)) {
        alert("Este Pokémon ya está en tu equipo.");
        return state;
      }
      return {
        ...state,
        equipo: [...state.equipo, action.payload],
      };

    case "REMOVER_POKEMON":
      return {
        ...state,
        equipo: state.equipo.filter((p) => p.id !== action.payload),
        // Si el pokémon removido era el activo, desactivarlo
        pokemonActivo:
          state.pokemonActivo === action.payload ? null : state.pokemonActivo,
      };

    case "SELECCIONAR_POKEMON_ACTIVO":
      return {
        ...state,
        pokemonActivo: action.payload,
      };

    case "INICIAR_BATALLA":
      if (!state.pokemonActivo) {
        alert("Selecciona un Pokémon activo primero.");
        return state;
      }
      return {
        ...state,
        enBatalla: true,
      };

    case "TERMINAR_BATALLA":
      return {
        ...state,
        enBatalla: false,
        // Reducir la vida del pokémon activo después de la batalla
        equipo: state.equipo.map((pokemon) => {
          if (pokemon.id === state.pokemonActivo) {
            return {
              ...pokemon,
              vida: Math.max(
                10,
                pokemon.vida - Math.floor(Math.random() * 30 + 10)
              ),
            };
          }
          return pokemon;
        }),
      };

    default:
      return state;
  }
}
