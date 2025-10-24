import Sesion from "./Sesion";
import ButtonCustom from "./ButtonCustom";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useEquipoStore } from "../store/equipoStore";
import { useEquipoUsuario } from "../../equipo/Hooks/useEquipoUsuario";
import { useEffect } from "react";

export default function Header() {

    const navigate = useNavigate();
    const usuario = useUserStore((state) => state.usuario);
    const { equipo, setEquipo } = useEquipoStore();
    const { data: equipousuario } = useEquipoUsuario(usuario?.id ?? 0);

    useEffect(() => {
        setEquipo(equipousuario ?? [])
    }, [equipousuario])

    return (
        <div className="mb-10">
            <div className="grid grid-cols-2">
                <div className="flex justify-center">
                    <img
                        src="/pokedex-logo.png"
                        className="w-70 h-20"
                        onClick={() => navigate("/")}
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
                                    onClick={() => navigate("/equipo")}
                                />
                            </div>
                            <div className="flex space-x-4">
                                {
                                    equipo.map(pokemon => (
                                        <div>
                                            <img
                                                key={pokemon.id}
                                                src={pokemon.imagen}
                                                className="max-h-7 2x1:max-h-14"
                                            />

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
