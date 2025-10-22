import { useMutation, useQuery } from "@tanstack/react-query";
import type { Pokemon } from "../../../interfaces/Pokemon.interface";
import api from "../../../../shared/util/api";
import { useState } from "react";

export default function useFavoritos() {

    const query = useQuery({
        queryKey: ["favoritos"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 300));
            const response = await api.get<Pokemon[]>("usuario/favoritos");
            console.log(response.data);
            setFavoritos(response.data.map(({ id }) => id))
            return response.data;
        },
    });


    const agregar = useMutation({
        mutationFn: async () => {
            try {
                const response = await api.post("favorito", favoritos.map(a => ({ pokemonId: a })))
                return response.data
            } catch (error) {
                console.error(error)
            }
        }
    })

    const [favoritos, setFavoritos] = useState<number[]>([])

    const toggleFavorito = (pokemon: Pokemon) => 
    {
        setFavoritos((prev) => {
            if (prev.find((p) => p === pokemon.id))
                return prev.filter((p) => p !== pokemon.id)
        return [...prev, pokemon.id]

    })
}



return { data: query.data, favoritos ,agregar, toggleFavorito }
}