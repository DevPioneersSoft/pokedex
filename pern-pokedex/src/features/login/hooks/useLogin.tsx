import { useMutation } from "@tanstack/react-query"
import type { formValue } from "../../layout/components/ModalSesion"
import api from "../../../shered/utils/api"
import { useUserStore } from "../../layout/store/userStore"

export const useLogin= ( ) => {
    const setUser = useUserStore(store => store.setUser)
    return useMutation({
        mutationFn: async (data : formValue) => {
            try {

                const response = await api.post('/autenticacion',data);
                console.log( response.data );
                return response.data;
                
            } catch (error) {
                console.error( error );
            }
        },
        // onSuccess: (data) => {
        //     setUser(data.usuario)
        // }
    })
} 