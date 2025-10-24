import Sesion from "./Sesion";
import ButtonCustom from "./ButtonCustom";
import { useNavigate } from "react-router-dom";
import { useEquipoStore } from "../../equipo/store/EquipoStore";
import { useEquipo } from "../../equipo/hooks/useEquipo";

export default function Header() {

    const navigate = useNavigate();
    useEquipo();
    const equipo = useEquipoStore(state => state.equipo)

    return (
        <div className="mb-10">
            <div className="grid grid-cols-2">
                <div className="flex justify-center">
                    <img
                        src="/pokedex-logo.png"
                        className="w-70 h-20"
                        onClick={()=> navigate('/')}
                    />
                </div>
                <div className="flex shadow-2xl p-2 rounded-2xl border-b-1 border-white grow">
                    <div className="grow">
                        <div className="flex space-x-10">
                            <div>
                                <ButtonCustom
                                    label="Mi equipo"
                                    color="warning"
                                    className="ml-10"
                                    onClick={()=> navigate('/equipo')}

                                />
                            </div>
                            <div className="flex space-x-4">
                                {
                                    equipo.map(pokemon =>(
                                        <div>
                                            <img className="max-h-7 2xl:max-h-14" key={pokemon.id} src={pokemon.imagen} alt={pokemon.nombre} />
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </div>
                    <Sesion />
                </div>
            </div>
        </div>
    )
}
