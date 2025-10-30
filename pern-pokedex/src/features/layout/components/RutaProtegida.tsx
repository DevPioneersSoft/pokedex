import { data } from "react-router-dom"
import { useUserStore } from "../store/userStore"

interface RutaProtegidaProps{
    children: React.ReactNode
}

export default function RutaProtegida({children}:RutaProtegidaProps) {

    const usuario = useUserStore((state) => state.usuario)

    if(!usuario){
        throw data({message: "No autorizado"},{status: 401})
    }

  return (
    <div>{children}</div>
  )
}
