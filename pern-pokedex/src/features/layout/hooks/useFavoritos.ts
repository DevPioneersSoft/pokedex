import { useMutation, useQuery } from "@tanstack/react-query";
import type { Pokemon } from "../../cuadricula/interfaces/Pokemon.interface";
import api from "../../../shered/utils/api";
import { useState } from "react";

export function useFavoritos() {
const query = useQuery({

    queryKey: ["favoritos"],
        queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const response = await api.get<Pokemon[]>("usuario/favoritos");
        setFavoritos(response.data.map(({id})=>id))
        return response.data;
        },
    });

    const agregar = useMutation({
        mutationFn: async(poke: Pokemon) => {
            const response = await api.post("favorito", favoritos.map((id)=>({pokemonId: id})));
            return response.data;
        }
    });

    const toggleFavorito = (pokemon:Pokemon) => {
        // if(favoritos.findIndex((id) => id === pokemon.id) !== -1){
        //     setFavoritos(favoritos.filter((id) => id !== pokemon.id));
        // } else {
        //     setFavoritos([...favoritos, pokemon.id]);
        // }
        setFavoritos((prev) => {
            if (prev.find((p) => p === pokemon.id))
                return prev.filter((p) => p !== pokemon.id);
            return [...prev, pokemon.id];
        });
    }

  const [favoritos, setFavoritos] = useState<number[]>([]);

  return {data: query.data, favoritos, agregar, toggleFavorito};
}

