import Cuadricula from "../../cuadricula/components/Cuadricula";
import { useEquipoStore } from "../store/EquiopoStore";
import EquipoList from "./EquipoList";

export default function Equipo() {

    const agregarEquipo = useEquipoStore(state => state.addPokemon);
    
    return (
        <div className="grid grid-cols-12 ml-20 mt-10">
            <div className="col-span-7 z-20">
                <Cuadricula
                    callback={agregarEquipo}
                    agregarFavorito={false}
                />
            </div>
            <div className="col-span-4 flex flex-col items-center">
                <EquipoList/>
            </div>
        </div>
    )
}
