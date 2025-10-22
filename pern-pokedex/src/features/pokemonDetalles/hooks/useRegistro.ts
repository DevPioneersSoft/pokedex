import { useMutation } from "@tanstack/react-query";
import api from "../../../shered/utils/api";

export function useRegistro(){
    return useMutation({
        mutationFn: async (data : {username : string, password : string }) => {
            try {
                const response = await api.post("autenticacion", data)
                return response;
            }catch(error){

            }
        }
    })
}

export function useCrearUsuario() {
    return useMutation({
        mutationFn: async (data: { username: string, password: string }) => {
            try {

                const response = await api.post("usuario", data);
                return response.data;

            } catch (error) {
                console.log(error);

            }
        }
    })
}