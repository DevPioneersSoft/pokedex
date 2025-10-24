import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import type { Pokemon } from '../../interfaces/Pokemon.interface';

const apiUrl = import.meta.env.VITE_API_URL;
const MAX_EQUIPO = 6;

export function useEquipo() {
  const queryClient = useQueryClient();

  const query = useQuery<Pokemon[]>({
    queryKey: ['equipo'],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/usuario/equipo`, { credentials: 'include' });
      if (!response.ok) throw new Error('No se pudo obtener el equipo');
      const data = await response.json();
      
      return Array.isArray(data) ? data : [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const mutarEquipo = useMutation({
    
    mutationFn: async (nuevoEquipo: (number | Pokemon)[]) => {
      
      const ids = nuevoEquipo.map(p => typeof p === 'number' ? p : p.id);
      const idsValidos = ids.filter((id) => typeof id === 'number' && !isNaN(id));
      const body = idsValidos.map((id) => ({ pokemonId: id }));
      const response = await fetch(`${apiUrl}/equipo`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error('No se pudo actualizar el equipo');
      const text = await response.text();
      if (!text) return null;
      try {
        return JSON.parse(text);
      } catch {
        return null;
      }
    },
  });

  const equipo = useMemo(() => (query.data ?? []) as Pokemon[], [query.data]);
  const equipoIds = equipo.map(p => p.id);
  const equipoLleno = equipo.length >= MAX_EQUIPO;

  const agregarPokemon = (pokemon: Pokemon) => {
    if (equipoIds.includes(pokemon.id) || equipoLleno) return;
    const siguiente = [...equipo, pokemon];
    const prev = equipo;
    queryClient.setQueryData(['equipo'], siguiente);
    mutarEquipo.mutate(siguiente, {
      onError: (err) => {
        console.error('Error al persistir equipo', err);
        queryClient.setQueryData(['equipo'], prev);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['equipo'] });
      }
    });
  };

  const quitarPokemon = (id: number) => {
    const siguiente = equipo.filter((p) => p.id !== id);
    const prev = equipo;
    queryClient.setQueryData(['equipo'], siguiente);
    mutarEquipo.mutate(siguiente, {
      onError: (err) => {
        console.error('Error al persistir equipo', err);
        queryClient.setQueryData(['equipo'], prev);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['equipo'] });
      }
    });
  };

  const estaEnEquipo = (id: number) => equipoIds.includes(id);
  const limpiarEquipo = () => {
    queryClient.setQueryData(['equipo'], []);
    mutarEquipo.mutate([]);
  };

  return {
    equipo,
    equipoIds,
    agregarPokemon,
    quitarPokemon,
    estaEnEquipo,
    limpiarEquipo,
    maximo: MAX_EQUIPO,
    equipoLleno,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}
