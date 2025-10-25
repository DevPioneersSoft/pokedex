import { useQuery } from "@tanstack/react-query";
import api from "../../../shered/utils/api";

export function useEquipoUsuario(userId: number) {
  return  useQuery({
      queryKey: ['equipo', userId],
      queryFn: async () => {
          try {
              const resp = await api.get("usuario/equipo");
              return resp.data;
          } catch (error: any) {
              throw new Error('Error al obtener el equipo:', error.response?.data?.message || error.message);
          }
      }
  })
}
