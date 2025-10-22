import { useMutation } from "@tanstack/react-query"
import api from "../../../shared/utils/api";

export default function useRegistro() {
  return useMutation({
    mutationFn: async (data: { username: string; contrasena: string }) => {
      const response = await api.post('/usuario', data);
      return response.data;
    }
  });
}
