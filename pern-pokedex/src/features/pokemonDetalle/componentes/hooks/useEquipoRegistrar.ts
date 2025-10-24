import { useMutation } from "@tanstack/react-query"
import api from "../../../shared/utils/api";

export default function useEquipoRegistrar() {
  
  return useMutation({
    mutationFn: async (pokemonIds: number[]) => {
      const response = await api.post('/equipo', pokemonIds.map(id => ({pokemonId: id})));
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Equipo guardado exitosamente:', data);
    }
  });
}