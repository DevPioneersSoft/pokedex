import { useMutation, useQuery } from "@tanstack/react-query"
import api from "../../../shered/utils/api";
import type { Pokemon } from "../../cuadricula/interfaces/Pokemon.interface";
import { useState } from "react";

export function useFavoritos(){
    const query= useQuery({
        queryKey: ["favoritos"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve,300));
            const response = await api.get<Pokemon[]>("usuario/favorito")
            setFavs(response.data.map(({id})=>id));
            return response.data
        }
    })

    const agregar = useMutation({    
        mutationFn: async () =>{
            try {
                const response = await api.post("favorito",favoritos.map(a=>({pokemonId:a})));
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
    });

    const toggleFav = (pokemon:Pokemon) =>{
        setFavs((prev) =>{
            if(prev.find((p) => p === pokemon.id)) 
                return prev.filter((p) => p !== pokemon.id)
            return [...prev, pokemon.id];

        });
    }

    const [favoritos, setFavs] = useState<number[]>([]);
    return {data:query.data, favoritos, agregar, toggleFav}
}
