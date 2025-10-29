import axios from "axios";
import { useUserStore } from "../../features/store/userStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACK_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    //Esto se ejecuta cuando el token de acceso esta vigente
    (response) => response, 
    //Esto se ejecuta cuando el token de acceso ha expirado
    async (error) =>{
    const originalRequest = error.config;
    //Excluir las rutas de autenticacion para evitar loops infinitos
    const isAuth = originalRequest.url?.includes('/autenticacion') &&
        !originalRequest.url?.includes('/autenticacion/refresh');
    if(error.response.status === 401 && !isAuth){
        try {
            //Intentar refresh token
            await api.post('/autenticacion/refresh');
            return api.request(originalRequest);
        } catch (error) {
            //Manejar error
            const store = useUserStore.getState();
            store.logout();
            return Promise.reject(error);
        }
    }
})

export default api;
