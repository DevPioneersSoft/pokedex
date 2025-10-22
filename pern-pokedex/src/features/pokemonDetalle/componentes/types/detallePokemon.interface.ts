import type { Pokemon } from '../../../layout/components/Pokemon';

export interface TipoPokemon {
  id: number;
  nombre: string;
}

export interface DetallePokemon extends Pokemon {
  tipoPokemon: TipoPokemon[];
}