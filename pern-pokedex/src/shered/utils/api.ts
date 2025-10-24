import axios from "axios";
import { useUserStore } from "../../features/layout/store/userStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACK_URL,
  withCredentials: true
});


api.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;
  const isAuth = originalRequest.url?.includes('/autenticacion') && !originalRequest.url?.includes('/autenticacion/refresh');
  if (error.response?.status === 401 && !isAuth) {
    try {
      await api.post('/autenticacion/refresh')
      return api.request(originalRequest);

    } catch (error) {
      const store = useUserStore.getState()
      store.logout()
      return Promise.reject(error)
    }
  }
});

export default api;
