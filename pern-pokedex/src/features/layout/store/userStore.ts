import { create } from 'zustand'

interface UserDto {
    id: number
    username: string
}

type UserStore = {
  usuario: UserDto | null
  setUser: (usuario: UserDto | null) => void
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => {
    const usuarioLocalStorage = localStorage.getItem('usuario');
    const initialUsuario = usuarioLocalStorage ? JSON.parse(usuarioLocalStorage) : null;
    return {
        usuario: initialUsuario,
        setUser: (usuario) => { 
            set({ usuario });
            if (usuario) {
                localStorage.setItem('usuario', JSON.stringify(usuario));
            } else {
                localStorage.removeItem('usuario');
            }
        },
        logout: () => {
            set({ usuario: null });
            localStorage.removeItem('usuario');
        },
    }
});

