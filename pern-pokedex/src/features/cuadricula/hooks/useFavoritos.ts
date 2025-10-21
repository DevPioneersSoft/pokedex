import { useMutation, useQuery } from "@tanstack/react-query"
import api from "../../../shered/utils/api"
import type { Pokemon } from "../interfaces/Pokemon.interface";
import { useState } from "react";

export const useFavoritos = () => {
    const query = useQuery({
        queryKey: ['favoritos'],
        queryFn: async () => {
            const { data } = await api<Pokemon[]>('/usuario/favoritos');
            setFavoritos(
                data.map(item => item.id)
            )
            return data;
        }
    });

    const agregarfavorito = useMutation({
        mutationFn: async () => {
            const response = await api.post('favorito', favoritos.map(id => ({ pokemonId: id })))
            return response.data;
        }
    })

    const toggleFav = (pokemon: Pokemon) => {
        setFavoritos((prev) => {
            if (prev.find((p) => p === pokemon.id))
                return prev.filter((p) => p !== pokemon.id);
            return [...prev, pokemon.id];
        });
    }

    const [favoritos, setFavoritos] = useState<number[]>([]);

    return {data: query.data,favoritos, toggleFav,agregarfavorito}

}