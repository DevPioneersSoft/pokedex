import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../../shered/utils/api";
import type { Pokemon } from "../interfaces/Pokemon.interface";
import { useState } from "react";

const useFavoritos = () => {
    const query = useQuery({
        queryKey : ['favoritos'],
        queryFn : async () => {
            await new Promise((resolve) => setTimeout(resolve, 300));
            const response = await api.get<Pokemon[]>('usuario/favoritos');
            console.log(response.data);
            setFavoritos(response.data.map(({id}) => id));
            return response.data;
        }
    });

    const [favoritos, setFavoritos] = useState<number[]>([]);

    const agregar = useMutation({
        mutationFn : async (lFavoritos: number[]) => {
            const response = await api.post('favorito',  lFavoritos.map(id => ({pokemonId: id})));
            return response.data;
        }
    });

    const toggleFavoritos = (pokemon : Pokemon) => {
        let lFavoritos: number[];
        if (favoritos.includes(pokemon.id)) {
            lFavoritos = favoritos.filter((id) => id !== pokemon.id);
            setFavoritos(lFavoritos);
        } else {
            lFavoritos = [...favoritos, pokemon.id];
            setFavoritos(lFavoritos);
        }
        agregar.mutate(lFavoritos);
    }

    return {data : query.data,
        favoritos,
        isLoading: query.isLoading,
        agregar,
        toggleFavoritos
    }

}

export default useFavoritos;