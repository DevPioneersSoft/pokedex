import type { Pokemon } from "../../cuadricula/interfaces/Pokemon.interface";
import type { Tipo } from "./pokemon-tipo.interface";

export interface PokemonDetalle extends Pokemon {
    tipoPokemon: Tipo[]
}