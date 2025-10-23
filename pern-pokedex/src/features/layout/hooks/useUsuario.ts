import { useMutation } from "@tanstack/react-query";
import api from "../../../shered/utils/api";
import { useUserStore } from "../store/userStore";

export function useIniciarSesion() {

  const {setuser} = useUserStore();

  return useMutation({
    mutationFn: async (data: {username : string, contrasena : string}) => {
        try {
            const response = await api.post("autenticacion", data);
						
						setuser(response.data.usuario);
            return response.data
        } catch (error) {
            throw error;
        }
    }
  })
}

export function useCrearUsuario() {
    return useMutation({
        mutationFn: async (data: {username : string, contrasena : string}) => {
            try {
                const response = await api.post("usuario", data);
                return response.data
            } catch (error) {
                throw error;
            }
        }
    })
}
