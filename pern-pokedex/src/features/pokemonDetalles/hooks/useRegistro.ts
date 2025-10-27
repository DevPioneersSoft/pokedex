import { useMutation } from '@tanstack/react-query'
import api from '../../../shered/utils/api';
import { useUserStore } from '../../layout/store/userStore';


export function useIniciarSesion() {

  const {usuario,setUser} = useUserStore();

  return useMutation({
    mutationFn: async (data:{username:string, contrasena:string}) =>{
        try {
            const response = await api.post("autenticacion",data);
            setUser(response.data.usuario);            
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
  });
}

export function useCrearUsuario(){
    return useMutation({
        mutationFn: async (data:{username:string, contrasena:string}) =>{
            try {
                const response = await api.post("usuario",data);
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
    });    
}

