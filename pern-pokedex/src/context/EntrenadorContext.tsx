import { createContext, useState } from "react";

interface Entrenador{
    nombre: string;
    medallas: number;
    pokemonActivo: string | null;
}

interface EntrenadorContextType {
    entrenador: Entrenador;
    ganarMedalla: () => void;
}

const defaultEntrenador: EntrenadorContextType = {
    entrenador: {
        nombre: "Ash Ketchum",
        medallas: 0,
        pokemonActivo: "Pikachu"
    },
    ganarMedalla: () => {
        console.log("Ganó una medalla");
    }
};

export const EntrenadorContext = createContext<EntrenadorContextType | null>(defaultEntrenador);

export function EntrenadorProvider({ children }: { children: React.ReactNode }) {
    const [entrenador, setEntrenador] = useState<Entrenador>(
        defaultEntrenador.entrenador
    );

    const ganarMedalla = () => {
        setEntrenador((props) => ({
            ...props,
            medallas: props.medallas + 1
        }));
    };

    return (
        <EntrenadorContext.Provider value={{ entrenador, ganarMedalla }}>
            {children}
        </EntrenadorContext.Provider>
    );
};