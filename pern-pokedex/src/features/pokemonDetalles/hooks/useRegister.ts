import { useMutation } from "@tanstack/react-query";
import api from "../../../shered/utils/api";

export function useLogin() {
    return useMutation({
        mutationFn: async (data: {username: string, contrasena: string}) => {
            try{
                const response = await api.post("autenticacion", 
                    data
                )
                console.log(response.data)
                return response.data
            } catch (error){
                console.error(error)
            }
        }
    })
}

export function useCreateUser(){
    return useMutation({
        mutationFn: async (data: {username: string, contrasena: string}) => {
            try{
                const response = await api.post("usuario",
                    data)
                console.log(response.data)
                return response.data
            } catch (error){
                console.error(error)
            }
        }
    })
}