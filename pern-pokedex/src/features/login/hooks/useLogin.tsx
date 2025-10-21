import { useMutation } from "@tanstack/react-query"
import type { formValue } from "../../layout/components/ModalSesion"
import api from "../../../shered/utils/api"

export const useLogin= ( ) => {
    return useMutation({
        mutationFn: async (data : formValue) => {
            try {

                const response = await api.post('/autenticacion',data);

                return response.data;
                
            } catch (error) {
                console.error( error );
            }
        }
    })
} 