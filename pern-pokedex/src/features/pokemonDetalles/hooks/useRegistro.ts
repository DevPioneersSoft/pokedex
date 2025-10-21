import { useMutation } from "@tanstack/react-query";
import api from "../../../shered/utils/api";

export function useIniciarSesion() {
  return useMutation({
    mutationFn: async (data: { username: string; contrasena: string }) => {
      try {
        const response = await api.post("autentication",data) 
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });
}

export function useCrearUsuario(){
     return useMutation({
    mutationFn: async (data: { username: string; contrasena: string }) => {
      try {
       const response = await api.post("usuario", data)
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  }); 
}
