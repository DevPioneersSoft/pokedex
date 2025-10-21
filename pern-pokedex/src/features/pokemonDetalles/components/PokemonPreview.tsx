import ButtonCustom from "../../layout/components/ButtonCustom";
import type { Pokemon } from "../../cuadricula/interfaces/Pokemon.interface";
import ModalGenerica from "../../layout/components/ModalGenerica";
import { useModalsStack } from "@mantine/core";
import { usePokemonDetalle } from "../hooks/usePokemonDetalles";
import PokemonDetalles from "./PokemonDetalles";


export default function PokemonPreview(pokemon: Pokemon) {
    const { id, imagen, nombre } = pokemon;

    const { data: pokemonDetalles, isLoading } = usePokemonDetalle(id)

    const stack = useModalsStack(["detallePokemon"])

    return (
        <>
            <div className="overflow-hidden">
                <div
                    className="relative w-screen h-screen rounded-2xl overflow-hidden bg-secondary-300/80 text-white shadow-xl border border-white/10"
                    style={{
                        transform:
                            "perspective(1000px) rotateY(-20deg) translateX(-50rem) translateY(-10rem)",
                        transformStyle: "preserve-3d",
                    }}
                >
                    <div className="absolute  opacity-20" />
                    <img
                        src={imagen}
                        alt={`${nombre} background`}
                        className="absolute -inset-x-70 -inset-y-40 z-0 w-[140%] h-[140%] object-contain opacity-10 scale-150"
                    />
                </div>
                <div className="absolute inset-60 z-10 flex flex-col items-center translate-x-100 -translate-y-20">
                    <h2 className="text-6xl font-bold  uppercase">
                        {nombre}
                    </h2>
                    <img src={imagen} alt={nombre} className="h-100 drop-shadow-lg" />
                    <div className="text-5xl font-bold">
                        #{String(id).padStart(3, "0")}
                    </div>
                    <div className="w-full max-w-4xl rounded-lg flex justify-center p-4 text-sm ">
                        <ButtonCustom
                            label="Ver detalles"
                            color="primary"
                            onClick={() => stack.open("detallePokemon")}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>

            <ModalGenerica
                title="Detalles"
                size={"70%"}
                footerLeftContent={
                    <ButtonCustom
                        label="Cerrar"
                        color="secondary"
                        onClick={() => stack.close("detallePokemon")}
                    />
                }
                {...stack.register("detallePokemon")}
            >
                {
                    pokemonDetalles && <PokemonDetalles pokemon={pokemonDetalles} />
                }
            </ModalGenerica>

        </>
    );
}
