import { useMutation } from "@tanstack/react-query";
import api from "../../../shered/utils/api";

const useLogin = () => { 
    return useMutation({
        mutationFn: async (data: { 
            username: string; 
            contrasena: string 
        }) => {
            try {
                const response = await api.post('autenticacion', data);
                return response.data;                
            } catch (error) {
                console.error(error)
            }

        }
    })   
}

export default useLogin;