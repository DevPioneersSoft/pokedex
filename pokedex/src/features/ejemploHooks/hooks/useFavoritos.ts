import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import type { Pokemon } from '../../interfaces/Pokemon.interface';

const apiUrl = import.meta.env.VITE_API_URL;

const useFavoritos = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["favoritos"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const response = await fetch(`${apiUrl}/usuario/favoritos`, { credentials: 'include' });
      if (!response.ok) throw new Error('No se pudo obtener favoritos');
      const data = await response.json();
      const ids: number[] = Array.isArray(data) ? data.map((item: { id: number }) => item.id) : [];
      return ids;
    },
  });

  const agregar = useMutation({
    mutationFn: async (favoritosAEnviar: number[]) => {
      
      const response = await fetch(`${apiUrl}/favorito`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favoritosAEnviar.map((a) => ({ pokemonId: a }))),
      });
      if (!response.ok) throw new Error('No se pudo agregar favorito');
      const text = await response.text();
      if (!text) return null;
      try {
        return JSON.parse(text);
      } catch {
        return null;
      }
    },
  });

  const toggleFavorito = (pokemon: Pokemon) => {
    const actuales = (query.data ?? []) as number[];
    const existe = actuales.includes(pokemon.id);
    const siguiente = existe ? actuales.filter((p) => p !== pokemon.id) : [...actuales, pokemon.id];
    const prev = actuales;
    
    queryClient.setQueryData(["favoritos"], siguiente);
    agregar.mutate(siguiente, {
      onError: (err) => {
        console.error('Error al persistir favoritos', err);
        queryClient.setQueryData(["favoritos"], prev);
      },
    });
  };

  const favoritos = useMemo(() => (query.data ?? []) as number[], [query.data]);

  return { data: query.data, favoritos, agregar, toggleFavorito };
};

export default useFavoritos;