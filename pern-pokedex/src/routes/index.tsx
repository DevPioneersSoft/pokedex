import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Pokedex from "../features/cuadricula/components/Pokedex";
import { EjemploUseReducer } from "../features/EjemplosHooks/EjemploUseReducer";
import Error from "../errors/Error";
import RutaProtegida from "../features/layout/components/RutaProtegida";
import Equipo from "../features/equipo/components/Equipo";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                Component: Pokedex
            },
            {
                path: "/equipo",
                element: (
                    <RutaProtegida>
                        <Equipo/>
                    </RutaProtegida>
                )
            },
            {
                path: "/batalla",
                Component: EjemploUseReducer
            }

        ]
    }
])