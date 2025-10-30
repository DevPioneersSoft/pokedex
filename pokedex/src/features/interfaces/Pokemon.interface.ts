export interface TipoPokemon {
  id: number;
  nombre: string;
}

export interface Pokemon {
  id: number;
  nombre: string;
  descripcion: string;
  ataque: number;
  ataqueEspecial: number;
  defensa: number;
  defensaEspecial: number;
  velocidad: number;
  vida: number;
  imagen: string;
  tipo: string[];
  tipoPokemon?: TipoPokemon[];
}