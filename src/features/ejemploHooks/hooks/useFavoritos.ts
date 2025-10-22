import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import type { Pokemon } from '../../interfaces/Pokemon.interface';

const apiUrl = import.meta.env.VITE_API_URL;

const useFavoritos = () => {
  const [favoritos, setFavoritos] = useState<number[]>([]);

  const query = useQuery({
    queryKey: ["favoritos"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const response = await fetch(`${apiUrl}/usuario/favoritos`);
      if (!response.ok) throw new Error('No se pudo obtener favoritos');
      const data = await response.json();
      setFavoritos(data.map((item: { id: number }) => item.id));
      return data;
    },
  });

  const agregar = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${apiUrl}/favorito`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favoritos.map((a) => ({ pokemonId: a }))),
      });
      if (!response.ok) throw new Error('No se pudo agregar favorito');
      return response.json();
    },
  });

  const toggleFavorito = (pokemon: Pokemon) => {
        setFavoritos((prev) => {
        if (prev.find((p) => p === pokemon.id))
            return prev.filter((p) => p !== pokemon.id);
        return [...prev, pokemon.id];
        });
    };  

  return { data: query.data, favoritos, agregar, toggleFavorito };
};

export default useFavoritos;