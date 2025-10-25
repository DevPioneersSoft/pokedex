import { create } from 'zustand'
import api from '../../../features/utils';
import { QueryClient } from '@tanstack/react-query';

interface UserData {
    id: number;
    username: string;
}

type UserStore = {
    usuario: UserData | null;
    setUser: (usuario: UserData) => void;
    logOut: () => void;
}

export const useUserStore = create<UserStore>((set) => {
  const usuarioLocal = localStorage.getItem('usuario');
  const usuarioInicial = usuarioLocal ? JSON.parse(usuarioLocal) : null;
  
  return {
    usuario: usuarioInicial,
    setUser: (usuario) => {
        if (usuario) {
            localStorage.setItem('usuario', JSON.stringify(usuario));
        } else {
            localStorage.removeItem('usuario');
        }
        set({ usuario });
    },
        logOut: async () => {
            try {
                await api.post('/autenticacion/logout');
            } catch (e) {
                console.log('Error al hacer logout', e);
            }
            localStorage.removeItem('usuario');
            set({ usuario: null });
            try {
                const queryClient = new QueryClient();
                queryClient.removeQueries({ queryKey: ['equipo'] });
            } catch (e) {}
        },
  
  };
});