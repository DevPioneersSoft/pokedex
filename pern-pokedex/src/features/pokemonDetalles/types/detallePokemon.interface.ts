import { Pokemon } from "../../cuadricula/interfaces/Pokemon.interface";

export interface PokemonDetalle extends Pokemon {
    tipoPokemon: string[]
}