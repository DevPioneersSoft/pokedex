import { useQuery } from '@tanstack/react-query'
import type { DetallePokemon } from '../types/detallePokemon.interface';
import api from '../../../shared/utils/api';

export function usePokemonDetalle(id:number) {
  const query = useQuery({
    queryKey: ['pokemonDetalle', id],
    queryFn: async () => {
      if (!id) return null;

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula retardo
      const response = await api.get<DetallePokemon>(`/pokemon/${id}`);
      return response.data;
    }
  });

  return {
    pokemonDetalle: query.data,
    cargandoDetalle: query.isLoading,
    errorDetalle: query.isError ? (query.error?.message || 'Error al cargar detalle') : null,
    refetchDetalle: query.refetch,
  };
}
