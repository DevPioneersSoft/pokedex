import { create } from 'zustand'

interface UserDto {
    id:number,
    username: string
}

type UserStroe = {
    usuario:UserDto | null,
    setuser: (usuario:UserDto| null) => void;
    logout: ()=>void
}

export const useUserStore = create<UserStroe>() ((set)=> {
    const usuarioLocal = localStorage.getItem("usuario");
    const initialUser = usuarioLocal ? JSON.parse(usuarioLocal) : null;
    return {
        usuario: initialUser,
        setuser: (usuario) => 
            {set({usuario})
                if(usuario)
                    localStorage.setItem("usuario", JSON.stringify(usuario))
                else
                    localStorage.removeItem("usuario")
            },
        logout: () => set({usuario: null}),
    }

});