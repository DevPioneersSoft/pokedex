import { useEffect } from "react";
import Cuadricula from "../../cuadricula/components/Cuadricula";
import { equipoUserStore } from "../../layout/store/userEquipoStore";
import ListaEquipo from "./ListaEquipo";
import { useEquipoUsuario } from "../hooks/useEquipoUsuario";
import { useUserStore } from "../../layout/store/userStore";

export default function Equipo() {
    const { addPokemon, resetDraft, setDraft } = equipoUserStore();


    const usuario = useUserStore((state) => state.usuario);

    const { data: equipoUsuario } = useEquipoUsuario(usuario?.id ?? 0);

    useEffect(() => {
        // Limpiar el equipo al montar el componente
        setDraft(equipoUsuario ?? []);
    }, [equipoUsuario]);

    return (
        <div>
            <div className="p-10 ">
                <Cuadricula registrarFavorito={false} callback={pokemon => addPokemon(pokemon)} />
            </div>
            <ListaEquipo />
        </div>
    )
}
