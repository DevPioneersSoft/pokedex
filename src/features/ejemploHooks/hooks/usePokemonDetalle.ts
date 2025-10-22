import { useQuery } from '@tanstack/react-query';
import type { Pokemon } from '../../interfaces/Pokemon.interface';

const apiUrl = import.meta.env.VITE_API_URL;

async function fetchPokemonDetalle(id: number): Promise<Pokemon> {
//   await new Promise(res => setTimeout(res, 2000)); // aguantar 2 segunditos
  const response = await fetch(`${apiUrl}/pokemon/${id}`);
  if (!response.ok) throw new Error('No se pudo obtener el detalle del pokemon');
  const data = await response.json();
  return data;
}

export function usePokemonDetalle(id: number) {
  return useQuery({
    queryKey: ['pokemonDetalle', id],
    queryFn: () => fetchPokemonDetalle(id),
    enabled: !!id,
  });
}
