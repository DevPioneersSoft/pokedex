import { Button, useModalsStack } from "@mantine/core";
import { Pokemon } from "../../cuadricula/interfaces/Pokemon.interface";
import ModalGenerica from "../../layout/components/ModalGenerica";
import { usePokemonDetalle } from "../hooks/usePokemonDetalles";
import PokemonDetalles from "./PokemonDetalles";

interface PokemonPreviewProps {
    pokemon: Pokemon,
    favorito: boolean,
    handleFav: () => void
}

export default function PokemonPreview({ pokemon, favorito, handleFav }: PokemonPreviewProps) {
    const { id, imagen, nombre } = pokemon

    const { data: pokemonDetalles, isLoading } = usePokemonDetalle(id)

    const stack = useModalsStack(["detallePokemon"])

    return (
        <>
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
                <div className="
                    relative w-full max-w-md aspect-[4/5] 
                    bg-secondary-300/80 
                    text-white rounded-2xl overflow-hidden 
                    shadow-xl border border-white/10 
                ">
                    <div className="absolute inset-0 z-0">
                        <img src={imagen} alt={`${nombre} background`} className="w-full h-full object-contain opacity-10 scale-125 grayscale" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center justify-between h-full py-6 text-center">
                        <h2 className="text-3xl font-bold uppercase drop-shadow-lg">{nombre}</h2>

                        <img
                            src={imagen}
                            alt={nombre}
                            className="h-48 object-contain drop-shadow-lg"
                        />

                        <div className="text-2xl font-bold opacity-90 mt-2">
                            #{String(id).padStart(3, "0")}
                        </div>

                        <div className="flex items-center justify-center gap-3 mt-4">
                            <Button
                                color="yellow"
                                onClick={handleFav}
                                className="flex items-center justify-center transition-all duration-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill={favorito ? "currentColor" : "none"}
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.8}
                                    stroke="currentColor"
                                    className="w-6 h-6 transition-transform duration-300"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 
                                        5.111a.562.562 0 00.475.345l5.518.402c.484.035.682.646.312.965l-4.202 
                                        3.63a.562.562 0 00-.182.557l1.29 5.384a.562.562 
                                        0 01-.84.61L12 18.347l-4.016 2.656a.562.562 
                                        0 01-.84-.61l1.29-5.384a.562.562 0 00-.182-.557l-4.202-3.63a.562.562 
                                        0 01.312-.965l5.518-.402a.562.562 
                                        0 00.475-.345L11.48 3.5z"
                                    />
                                </svg>
                            </Button>

                            <Button disabled={isLoading} color="lime" onClick={() => stack.open("detallePokemon")}>Ver detalles</Button>
                        </div>
                    </div>

                </div>
            </div>

            <ModalGenerica
                title="Detalles"
                size={"xl"}
                footerLeftContent={<Button color="gray" onClick={() => stack.close("detallePokemon")}>Cerrar</Button>}
                {...stack.register("detallePokemon")}
            >
                {pokemonDetalles && <PokemonDetalles pokemon={pokemonDetalles} />}
            </ModalGenerica>

        </>
    )
}