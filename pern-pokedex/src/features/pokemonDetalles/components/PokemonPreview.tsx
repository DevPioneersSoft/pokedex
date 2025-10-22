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
      <div
        className="
          relative 
          w-full 
          flex 
          flex-col 
          items-center 
          justify-center 
          text-center 
          rounded-2xl 
          overflow-hidden 
          bg-gradient-to-br 
          from-secondary-400/70 
          to-secondary-800/80 
          shadow-2xl 
          border 
          border-white/10 
          backdrop-blur-md 
          p-6 
          md:p-10 
          transition-all 
          duration-500 
          ease-in-out 
          hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]
        "
      >
        {/* Background image */}
        <img
          src={imagen}
          alt={`${nombre} background`}
          className="
            absolute 
            inset-0 
            object-contain 
            opacity-10 
            scale-150 
            blur-sm 
            pointer-events-none
            transition-transform 
            duration-700 
            ease-out
          "
        />

        {/* Foreground content */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-4 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-wide drop-shadow-lg">
            {nombre}
          </h2>

          <img
            src={imagen}
            alt={nombre}
            className="
              h-48 md:h-72 
              drop-shadow-lg 
              transform 
              transition-transform 
              duration-300 
              ease-out 
              hover:scale-110
            "
          />

          <div className="text-3xl md:text-5xl font-bold text-white/90">
            #{String(id).padStart(3, "0")}
          </div>

          <div className="mt-4">
            <ButtonCustom
              label="Ver detalles"
              color="primary"
              onClick={() => stack.open("detallePokemon")}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalGenerica
        title="Detalles"
        size="70%"
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
