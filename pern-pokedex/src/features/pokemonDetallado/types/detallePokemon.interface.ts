import type { Pokemon } from "../../interfaces/Pokemon.interface";
import type { Tipo } from "./pokemon-tipo.interface";

export interface PokemonDetalle extends Pokemon{
 tipoPokemon: Tipo[],
  
}