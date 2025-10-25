import { useMutation } from "@tanstack/react-query";
import api from "../../../shered/utils/api";

export  function useRegistrarEquipo() {
  return  useMutation({
    mutationFn: async (pokemonIds: number[]) => {
        const payload = pokemonIds.map(id => ({ pokemonId: id }));
        try {
          const resp = await api.post("equipo", payload);
          return resp.data;
        } catch (error: any) {
          throw new Error('Error al registrar el equipo:', error.response?.data?.message || error.message);
        } 
    }
  })
}



