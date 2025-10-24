import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Pokedex from "../features/cuadricula/components/Pokedex";
import Error from "../errors/Error";
import equipo from "../features/layout/components/Equipo";

export const routes = createBrowserRouter([
    {
        path:"/",
        Component: App,
        errorElement: <Error />,
        children: [
            {
                path:"/",
                Component: Pokedex
            },
            {
                path:"/equipo",
                Component: equipo
            }
        ]
    }
])