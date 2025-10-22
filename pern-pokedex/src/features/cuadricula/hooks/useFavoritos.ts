import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../../shered/utils/api";
import type { Pokemon } from "../interfaces/Pokemon.interface";
import { useState } from "react";

const useFavoritos = () => {

    const [favoritos, setFavoritos] = useState<number[]>([]);

    const query = useQuery({
        queryKey: ["favoritos"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 300));
            const response = await api.get<Pokemon[]>("usuario/favoritos");
            setFavoritos(response.data.map(({id}) =>id))
            return response.data;
        }
    });

    const agregar = useMutation({
        mutationFn: async () => {
                const response = await api.post("favorito ",
                    favoritos.map(a=>({pokemonId:a})));
                return response.data;
            }
    })

    const toggleFav = (pokemon:Pokemon)=>{
        setFavoritos((prev) => {
            if (prev.find((p) => p === pokemon.id)) 
                return prev.filter((p) => p !== pokemon.id);
            return [...prev, pokemon.id];
        })
    }

    return {data: query.data, favoritos, agregar, toggleFav}
}

export default useFavoritos;