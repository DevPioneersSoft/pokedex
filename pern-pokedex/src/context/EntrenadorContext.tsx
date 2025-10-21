import { createContext, useState } from "react";

interface Entrenador {
    nombre: string;
    medallas: number;
    pokemonActivo: string | null;
}
interface EntrenadorContextype{
    entrenador: Entrenador;
    ganarMedalla: ()=>void;
}

const defaultEntrenador : EntrenadorContextype = {
    entrenador: {
        nombre: "Ash",
        medallas: 0,
        pokemonActivo: "Pikachu"
    },
    ganarMedalla: () => {
        console.log("Ganaste una medalla");
    }
}

export const EntrenadorContext = createContext<EntrenadorContextype>(defaultEntrenador);

export function EntrenadorProvider({children} : {children: React.ReactNode}) {
    const [entrenador, setEntrenador] = useState<Entrenador>(
        defaultEntrenador.entrenador
    );
    const ganarMedalla = () => {
        setEntrenador((prev) => ({
            ...prev,
            medallas: prev.medallas + 1,
        }));
    }
    return (
        <EntrenadorContext.Provider value={{entrenador, ganarMedalla}}>
            {children}
        </EntrenadorContext.Provider>
    );
}
