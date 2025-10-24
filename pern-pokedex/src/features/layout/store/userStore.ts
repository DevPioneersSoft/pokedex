import { create } from 'zustand'
import type { Pokemon } from '../components/Pokemon'

interface UserDto {
    id: number
    username: string
}

type UserStore = {
  usuario: UserDto | null
  equipoPokemon: Pokemon[]
  setUser: (usuario: UserDto | null) => void
  setEquipoPokemon: (equipo: Pokemon[]) => void
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => {
    const usuarioLocalStorage = localStorage.getItem('usuario');
    const initialUsuario = usuarioLocalStorage ? JSON.parse(usuarioLocalStorage) : null;
    return {
        usuario: initialUsuario,
        equipoPokemon: [],
        setUser: (usuario) => { 
            set({ usuario });
            if (usuario) {
                localStorage.setItem('usuario', JSON.stringify(usuario));
            } else {
                localStorage.removeItem('usuario');
            }
        },
        setEquipoPokemon: (equipo) => {
            set({ equipoPokemon: equipo });
        },
        logout: () => {
            set({ usuario: null, equipoPokemon: [] });
            localStorage.removeItem('usuario');
        },
    }
});

