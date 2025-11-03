import { useMutation } from "@tanstack/react-query"
import api from "../../../shared/utils/api";
import type { Pokemon } from "../../../layout/components/Pokemon";
import { useUserStore } from "../../../layout/store/userStore";

export default function useEquipoUsuario() {
  const { usuario } = useUserStore();
  
  return useMutation<Pokemon[], Error>({

    mutationFn: async () => {
      if (!usuario || !usuario.id) {
        throw new Error('Usuario no autenticado o sin ID válido');
      }
      
      const response = await api.get<Pokemon[]>(`/equipo/usuario/${usuario.id}`);
      console.log(response.data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Equipo cargado exitosamente:', data);
    }
  });
}