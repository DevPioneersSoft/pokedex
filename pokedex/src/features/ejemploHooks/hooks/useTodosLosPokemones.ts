import { useQuery } from '@tanstack/react-query';
import type { Pokemon } from '../../interfaces/Pokemon.interface';

const apiUrl = import.meta.env.VITE_API_URL;

export function useTodosLosPokemones() {
  return useQuery<Pokemon[]>({
    queryKey: ['todos-los-pokemones'],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/pokemon`);
      if (!response.ok) throw new Error('No se pudo obtener todos los pokemones');
      const data = await response.json();
      return data.data as Pokemon[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutos para refrescar los pokemones
  });
}
