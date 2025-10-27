import { useMutation } from "@tanstack/react-query";
import api from "../../../shered/utils/api";


export default function useRegistrarEquipo() {
  return useMutation({
        mutationFn: async (pokemonIds : number[]) =>{
            const payload = pokemonIds.map((id) => ({pokemonId:id}));
            try {
                const response = await api.post('/equipo',payload);
                return response.data;
            } catch (error: any) {
                throw new Error(error?.response?.data?.message || "Error al registrar equipo");
            }
        }
  })
}