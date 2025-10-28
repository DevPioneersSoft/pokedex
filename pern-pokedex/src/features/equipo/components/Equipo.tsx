import { useEffect } from "react";
import Cuadricula from "../../cuadricula/components/Cuadricula";
import { useEquipoStore } from "../../store/equipoStore";

import ListaEquipo from "./ListaEquipo";
import { useUserStore } from "../../store/userStore";
import { useEquipoUsuario } from "../hooks/useEquipoStore";

export default function Equipo() {

    const usuario = useUserStore(state => state.usuario)

    const { addPokemon, resetDraft, setDraft } = useEquipoStore()

    const { data: equipoUsuario } = useEquipoUsuario(usuario?.usuario.id ?? 0)

    useEffect(() => {

        setDraft(equipoUsuario ?? [])

        return () => {
            resetDraft()
        }
    }, [equipoUsuario]);

    return (
        <>
        <div className="grid grid-cols-12 ml-10 mt-10">
            <div className="col-span-5 z-20">
            <Cuadricula callback={pokemon => addPokemon(pokemon)} />
            </div>
            <div className="col-span-6 z-50 sticky top-0 self-start">
               <ListaEquipo />
                </div>
            </div>
        </>
    )
}