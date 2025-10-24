import { useMutation, useQuery } from "@tanstack/react-query"
import { useEquipoStore } from "../../equipo/store/EquipoStore";
import api from "../../../shered/utils/api";
import type { Pokemon } from "../interfaces/Pokemon.interface";

const guardarEquipoApi = async (ids: number[]) => {
    const { data } = await api.post('/equipo', ids.map(pokemonId => ({ pokemonId })))
    return data;
}

export const useEquipo = () => {
    const { equipo, addEquipo } = useEquipoStore();
    const { isFetching } = useQuery({
        queryKey: ['equipo'],
        queryFn: async () => {
            const { data } = await api<Pokemon[]>('/usuario/equipo');
            addEquipo(data)
            return data;
        },

    });

    const guardarEquipo = useMutation({
        mutationFn: async () => {
            const ids = equipo.map((p) => p.id);
            return guardarEquipoApi(ids);
        },
        onSuccess: () => {
            console.log('Equipo Guardado');
        },
        onError: (error) => {
            console.log('error');
        },
    });

    return { guardarEquipo, isLoading: isFetching }
}