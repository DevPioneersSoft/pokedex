import { useMutation } from "@tanstack/react-query"
import api from "../../../shered/api"

export function useRegistro() {
    return useMutation({
        mutationFn: async (data: { username: string, contrasena: string }) => {
            try {
                const response = await api.post("usuario", data)
                return response.data
            } catch (error) {
                console.error(error)
            }
        }
    })
}