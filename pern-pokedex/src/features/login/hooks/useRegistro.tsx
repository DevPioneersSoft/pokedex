import { useMutation } from "@tanstack/react-query"
import type { formValue } from "../../layout/components/ModalSesion"
import api from "../../../shered/utils/api"

export const useRegistro = ( ) => {
    return useMutation({
        mutationFn: async (data : formValue) => {
            try {

                const response = await api.post('/usuario',data);

                console.log( response.data );
                return response.data;
                
            } catch (error) {
                console.error( error );
            }
        }
    })
} 