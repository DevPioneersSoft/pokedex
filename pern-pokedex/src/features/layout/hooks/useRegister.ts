import { useMutation } from "@tanstack/react-query"
import api from "../../../shered/utils/api";

const useRegister = () => {
    return useMutation({
        mutationFn: async (
            data: { 
                username: string;
                contraseña: string }) => {
                    const response = await api.post("usuario ", data);
                    return response.data;
                }
    })
}

export default useRegister;