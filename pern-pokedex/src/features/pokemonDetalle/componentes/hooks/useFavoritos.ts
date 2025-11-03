import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Pokemon } from "../../../layout/components/Pokemon";
import api from "../../../shared/utils/api";
import { useState } from "react";
import { useUserStore } from "../../../layout/store/userStore";

const useFavoritos = () => {
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const queryClient = useQueryClient();
  const { usuario } = useUserStore();

  const query = useQuery({
    queryKey: ["favoritos"],
    queryFn: async () => {
      // Si no hay usuario, retorna lista vacía
      if (!usuario) {
        setFavoritos([]);
        return [];
      }
      
      await new Promise((resolve) => setTimeout(resolve, 300));
      const response = await api.get<Pokemon[]>(`/favoritos/usuario/${usuario.id}`);
      setFavoritos(response.data.map(({id}) => id));
      console.log(response.data);
      return response.data;
    },
    enabled: !!usuario, // Solo ejecuta la query si hay usuario
  });

  const agregar = useMutation({
    mutationFn: async (pokemonIds: number[]) => {
      
      if (!usuario) {
        setFavoritos([]);
        return [];
      }

      const response = await api.put(`/favoritos/usuario/${usuario.id}`, { pokemonIds });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoritos"] });
    }
  });

  const toggleFavorito = (pokemon: Pokemon) => {
    // Si no hay usuario, no hacer nada
    if (!usuario) {
      return;
    }
    
    let nuevosFavoritos: number[];
    
    if (favoritos.includes(pokemon.id)) {
      nuevosFavoritos = favoritos.filter((id) => id !== pokemon.id);
      setFavoritos(nuevosFavoritos);
    } else {
      nuevosFavoritos = [...favoritos, pokemon.id];
      setFavoritos(nuevosFavoritos);
    }
    agregar.mutate(nuevosFavoritos);
  };

  return { 
    data: query.data, 
    favoritos, 
    setFavoritos, 
    toggleFavorito,
    agregar 
  };
};

export default useFavoritos;