import { useUserStore } from "../store/userStore";

interface RutaProtegidaProps {
    children: React.ReactNode
}

export default function RutaProtegida({ children }: RutaProtegidaProps) {
    
    const usuario = useUserStore((state) => state.usuario);
    if (!usuario) {
        throw Object.assign(new Error("No tienes permisos"), { status: 401 });
    }

    return(<>{children}</>);
}