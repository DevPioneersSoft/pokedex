import { useMutation } from "@tanstack/react-query"
import api from "../../../shared/utils/api";
import type { Pokemon } from "../../../layout/components/Pokemon";

export default function useEquipoUsuario() {
  
  return useMutation<Pokemon[], Error>({
    mutationFn: async () => {
      const response = await api.get<Pokemon[]>('/usuario/equipo');
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Equipo cargado exitosamente:', data);
    }
  });
}