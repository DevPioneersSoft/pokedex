import { useQuery } from "@tanstack/react-query"
import type { Pokemon } from "../../cuadricula/interfaces/Pokemon.interface"
import api from "../../../shered/utils/api"

export function useEquipoUsuario(userId: number){
    return useQuery({
        queryKey: ["equipo", userId],
        queryFn: async () => {
            try{
                const response = await api.get<Pokemon[]>('usuario/equipo')
            }catch(error: any){
                throw new Error(
                    error?.response?.data?.message || "Error al consultar equipo"
                )
            }
        }
    })
}