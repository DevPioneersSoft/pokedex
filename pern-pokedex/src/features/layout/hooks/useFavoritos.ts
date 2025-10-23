import { useMutation, useQuery } from "@tanstack/react-query";
import type { Pokemon } from "../../cuadricula/interfaces/Pokemon.interface";
import api from "../../../shered/utils/api";
import { useState } from "react";

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<number[]>([]);

  const query = useQuery({
    queryKey: ["favoritos"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const response = await api.get<Pokemon[]>("usuario/favoritos");
      setFavoritos(response.data.map(({ id }) => id));
      return response.data;
    },
  });

  const agregar = useMutation({
    mutationFn: async () => {
      const payload = Array.from(new Set(favoritos)).map((id) => ({ pokemonId: id }));
      const response = await api.post("favorito", payload);
      return response.data;
    }
  });

  const toggleFavorito = (pokemon: Pokemon) => {
    setFavoritos((prev) => {
      if (prev.find((p) => p === pokemon.id)) return prev.filter((p) => p !== pokemon.id);
      return [...prev, pokemon.id];
    });
  };

  return { data: query.data, favoritos, agregar, toggleFavorito };
}

