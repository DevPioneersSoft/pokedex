import { useMutation } from '@tanstack/react-query';

const apiUrl = import.meta.env.VITE_API_URL;

export default function useRegistroUsuario(): any {
    return useMutation({
        mutationFn: async (data: { username: string; contrasena: string }) => {

            try {
                const response = await fetch(`${apiUrl}/usuario`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) throw new Error('Error al registrar usuario');
                return response.json();
            } catch (error) {
                console.error(error);
                throw new Error('Error al registrar usuario');
            }
        },
    });
}
