import { useMutation } from "@tanstack/react-query"
import api from "../../../shared/utils/api";

export default function useAutenticacion() {
  return useMutation({
    mutationFn: async (data: { username: string; contrasena: string }) => {
      const response = await api.post('/autenticacion', data);
      return response.data;
    }
  });
}