import { useEffect } from "react";
import Cuadricula from "../../cuadricula/components/Cuadricula";
import { useEquipoStore } from "../../layout/store/equipoStore";
import ListaEquipo from "./ListaEquipo";
import { useEquipoUsuario } from "../hooks/useEquipoUsuario";
import { useUserStore } from "../../layout/store/userStore";

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
            <div className="p-10">
                <Cuadricula registrarFavortios={false} callback={pokemon => addPokemon(pokemon)} />
            </div>
            <ListaEquipo />
        </>
    )
}
