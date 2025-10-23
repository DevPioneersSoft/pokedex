import { useMutation } from "@tanstack/react-query"
import api from "../../../shared/utils/api";
import { useUserStore } from "../../../layout/store/userStore";

export default function useRegistro() {
  const { setUser } = useUserStore();
  
  return useMutation({
    mutationFn: async (data: { username: string; contrasena: string }) => {
      const response = await api.post('/usuario', data);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.usuario);
    }
  });
}
