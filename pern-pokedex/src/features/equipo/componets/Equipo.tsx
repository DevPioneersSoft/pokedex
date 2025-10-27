import { useEffect } from "react";
import Cuadricula from "../../cuadricula/components/Cuadricula";
import ListaEquipo from "./ListaEquipo";
import { useEquipoStore } from "../../store/equipoStore";
import { useEquipoUsuario } from "../hooks/useEquipoUsuario";
import { useUserStore } from "../../layout/store/userStore";


export default function Equipo() {

  const usuario = useUserStore(state => state.usuario);
  const {addPokemon,resetDraft, setDraft} = useEquipoStore();
  const {data: equipoUsuario} = useEquipoUsuario(usuario?.id ?? 0);

  useEffect(()=>{
    setDraft(equipoUsuario ?? []);
    return()=>{
      resetDraft();
    }
  },[equipoUsuario]);

  return (
    <>
      <div className="p-10">
        <Cuadricula registrarFavoritos={false} callback={pokemon =>addPokemon(pokemon)}/>
      </div>
      <ListaEquipo/>
    </>
  )
}
