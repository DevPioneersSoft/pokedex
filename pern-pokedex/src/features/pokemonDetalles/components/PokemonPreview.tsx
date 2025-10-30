import ButtonCustom from "../../layout/components/ButtonCustom";
import type { Pokemon } from "../../cuadricula/interfaces/Pokemon.interface";
import ModalGenerica from "../../layout/components/ModalGenerica";
import { useModalsStack } from "@mantine/core";
import { usePokemonDetalle } from "../hooks/usePokemonDetalles";
import PokemonDetalles from "./PokemonDetalles";

export default function PokemonPreview(pokemon: Pokemon) {
  const { id, imagen, nombre } = pokemon;

  const { data: pokemonDetalles, isLoading } = usePokemonDetalle(id);

  const stack = useModalsStack(["detallePokemon"]);

  return (
    <>
      <div className="overflow">
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            transform:
              "perspective(1000px) rotateY(-20deg) translateX(-20%) translateY(-5%)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute opacity-20" />
          <img
            src={imagen}
            alt={`${nombre} background`}
            className="absolute inset-0 z-0 w-full h-full object-contain opacity-10 scale-150"
          />
        </div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <h2 className="text-5xl font-bold uppercase mb-4">{nombre}</h2>
          <img src={imagen} alt={nombre} className="h-64 drop-shadow-lg mb-4" />
          <div className="text-4xl font-bold mb-4">
            #{String(id).padStart(3, "0")}
          </div>
          <div className="rounded-lg flex justify-center">
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
        {pokemonDetalles && <PokemonDetalles pokemon={pokemonDetalles} />}
      </ModalGenerica>
    </>
  );
}
