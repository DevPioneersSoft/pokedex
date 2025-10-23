import { create } from 'zustand'

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
    logOut: () => set({ usuario: null }),
  
  };
});