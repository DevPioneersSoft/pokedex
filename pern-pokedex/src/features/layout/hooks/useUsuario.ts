import { useMutation } from "@tanstack/react-query";
import api from "../../../shered/utils/api";

export function useIniciarSesion() {
  return useMutation({
    mutationFn: async (data: {username : string, contrasena : string}) => {
        try {
            const response = await api.post("autenticacion", data);
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
