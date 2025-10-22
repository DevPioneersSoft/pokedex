import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Pokemon } from "../interfaces/Pokemon.interface";
import api from "../../../shered/api";

export function useFavoritos() {
    const query = useQuery({
        queryKey: ["favoritos"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 300));
            const response = await api.get<Pokemon[]>("usuario/favoritos");
            setFavs(response.data.map(({ id }) => id))
            return response.data;
        },
    })

    const agregar = useMutation({
        mutationFn: async () => {
            const response = await api.post('favorito', favoritos.map(a => ({ pokemonId: a })))
            return response.data
        }
    })


    const toggleFav = (pokemon: Pokemon) => {
        if (favoritos.indexOf(pokemon.id) == -1) {
            setFavs((a) => [
                ...a, pokemon.id
            ])
        } else {
            setFavs(a => a.filter(id => id !== pokemon.id))
        }

    }

    const [favoritos, setFavs] = useState<number[]>([])

    return { data: query.data, favoritos, agregar, toggleFav }
}


