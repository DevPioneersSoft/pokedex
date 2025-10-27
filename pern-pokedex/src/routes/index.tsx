import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Pokedex from "../features/cuadricula/components/Pokedex";
import Equipo from "../features/equipo/components/Equipo";
import { EjemploUseReducer } from "../features/ejemplosHooks/EjemploUseReducer";
import Error from "../features/errors/Error";
import RutaProtegida from "../features/layout/components/RutaProtegida";

export const router = createBrowserRouter([
    {
        path:"/",
        Component: App,
        errorElement: <Error/>,
        children: [
            {
                path:"/",
                Component: Pokedex
            },
            {
                path:'/equipo',
                element: (
                    <RutaProtegida>
                        <Equipo/>
                    </RutaProtegida>
                )
            },
                        {
                path:'/batalla',
                Component: EjemploUseReducer
            }
        ]
    },

])