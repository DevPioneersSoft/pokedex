import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../../shered/utils/api";
import { promise, set } from "zod";
import type { Pokemon } from "../../cuadricula/interfaces/Pokemon.interface";
import { useState } from "react";


const userRegistrarPokemonesFavoritos = () =>{
    const query = useQuery({
        queryKey: ['favoritos'],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 300));
            const resp = await api.get<Pokemon[]>("usuario/favoritos");
            setFavoritos(resp.data.map(pokemon => pokemon.id));
            return resp.data;
        }
    });

    const agregar = useMutation({
        mutationFn: async () => {
        try {
          const resp = await api.post("favorito", favoritos.map(id => ({ pokemonId: id })));
          return resp.data;
        } catch (error) {
          console.error('Error al agregar favorito:', error);
          throw error;
        }
      },
    });

    const toogleFavorito = (pokemon: Pokemon) => {
        setFavoritos((prevFavoritos) => {
            if (prevFavoritos.find((id) => id === pokemon.id)) {
                return prevFavoritos.filter(id => id !== pokemon.id);
            } else {
                return [...prevFavoritos, pokemon.id];
            }
        });
    };

    const [favoritos, setFavoritos] = useState<number[]>([]);

    return {data : query.data,favoritos,agregar,toogleFavorito};
}

export default userRegistrarPokemonesFavoritos;