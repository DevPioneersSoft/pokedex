import { useMutation } from "@tanstack/react-query"
import api from "../../../shered/utils/api";



export  function useLoginHook() {
  return  useMutation({
      mutationFn: async (formData: {username: string, contrasena: string}) => {
        try {
          const resp = await api.post("autenticacion",formData);
          return resp.data;
        } catch (error) {
          console.error('Error al registrar el usuario:', error);
        }
      },
    }); 
}
 

export function userCrearCuentaHook() {
  return  useMutation({
      mutationFn: async (formData: {username: string, contrasena: string}) => {
        try {
          const resp = await api.post("usuario", formData);
          return resp.data;
        } catch (error) {
          console.error('Error al crear la cuenta:', error);
          throw error;
        }
      },
    });
}