import { useEffect } from "react";
import Cuadricula from "../../cuadricula/components/Cuadricula";
import { useEquipoStore } from "../../layout/store/equipoStore";
import ListaEquipo from "./ListaEquipo";
import { useUserStore } from "../../layout/store/userStore";
import { useEquipoUsuaario } from "../hooks/useEquipoUsuario";

export default function Equipo(){

    const usuario = useUserStore(state => state.usuario)

    const {addPokemon, resetDraft, setDraft} = useEquipoStore()

    const {data: equipoUsuario} = useEquipoUsuaario(usuario?.usuario.id ?? 0)


    useEffect(() => {

        setDraft(equipoUsuario ?? [])

        return() => {
            resetDraft
        }
    }, [equipoUsuario])

    return(
        <>
            <Cuadricula 
                callback={pokemon => addPokemon(pokemon)} favOrTeam={2}
            />
            <ListaEquipo/>
        </>
        )
}