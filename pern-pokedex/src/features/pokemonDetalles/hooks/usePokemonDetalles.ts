import { useQuery } from "@tanstack/react-query";
import api from "../../../shered/api";
import type { PokemonDetalle } from "../types/detallePokemon.interface";

export function usePokemonDetalle(id: number) {
    return useQuery({
        queryKey: ["pokemonDetalle", id],
        queryFn: async () => {
            const response = await api.get<PokemonDetalle>("pokemon/" + id)
            return response.data
        }
    })

}