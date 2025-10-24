import { useMutation } from "@tanstack/react-query"
import { useEquipoStore } from "../../equipo/store/EquiopoStore";
import api from "../../../shered/utils/api";

const guardarEquipo = async (ids: number[]) => {
    const { data } = await api.post('/equipo', ids.map(pokemonId => ({pokemonId})))
    return data;
}

export const useEquipo = () => {
    const { equipo } = useEquipoStore();

    return useMutation({
        mutationFn: async () => {
            const ids = equipo.map((p) => p.id);
            return guardarEquipo(ids);
        },
        onSuccess: () => {
            console.log( 'Equipo Guardado' );
        },
        onError: (error) => {
            console.log( 'error' );
        },
    });
}