import { useEffect } from 'react';
import Cuadricula from '../../cuadricula/components/Cuadricula';
import { useEquipoStore } from '../../layout/store/equipoStore';
import ListaEquipo from './ListaEquipo';
import { useEquipoUsuario } from '../Hooks/useEquipoUsuario';
import { useUserStore } from '../../layout/store/userStore';

export default function Equipo() {

  const uusario = useUserStore(state => state.usuario);
  const { addPokemon, resetDraft, setDraft } = useEquipoStore();


  const {data: equipousuario} = useEquipoUsuario(uusario?.id ?? 0);

   useEffect(()=>{

    setDraft(equipousuario ?? []);

    return () =>{
      resetDraft()
    }
  },[equipousuario]); 

  return (
    <div className="p-10">
      <Cuadricula registrarFavoritos={false} callback={(pokemon) => addPokemon(pokemon)} />
      <ListaEquipo />
    </div>
  );
}
