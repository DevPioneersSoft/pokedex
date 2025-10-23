import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Pokemon } from "../../../layout/components/Pokemon";
import api from "../../../shared/utils/api";
import { useState } from "react";

const useFavoritos = () => {
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["favoritos"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const response = await api.get<Pokemon[]>("/usuario/favoritos");
      setFavoritos(response.data.map(({id}) => id));
      console.log(response.data);
      return response.data;
    },
  });

  const agregar = useMutation({
    mutationFn: async (pokemonIds: number[]) => {
      const response = await api.post("/favorito", pokemonIds.map(id => ({pokemonId: id})));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoritos"] });
    }
  });

  const toggleFavorito = (pokemon: Pokemon) => {
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