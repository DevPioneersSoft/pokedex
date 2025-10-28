import { useQuery } from "@tanstack/react-query"
import api from "../../../shered/utils/api"
import type { Pokemon } from "../../cuadricula/interfaces/Pokemon.interface"

export function useEquipoUsuario(userId: number) {
    return useQuery({
        queryKey: ["equipo", userId],
        queryFn: async () => {
            try {
                const response = await api.get<Pokemon[]>('/usuario/equipo')
                return response.data
            } catch (error: any) {
                throw new Error(
                    error?.response?.data?.message || "Error al consultar al equipo"
                )
            }
        }
    })
}