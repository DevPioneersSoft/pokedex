 //Agregar favortios
export interface ResponsePokemons{
  data: Pokemon[]
  total: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: Boolean
}


 export interface Pokemon{
    
      id: number;
      nombre: string;
      descripcion?: string;
      grunido?: string;
      imagen: string;
      vida?: number;
      ataque?: number;
      defensa?: number;
      ataqueEspecial?: number;
      defensaEspecial?: number;
      velocidad?: number;
    }
  