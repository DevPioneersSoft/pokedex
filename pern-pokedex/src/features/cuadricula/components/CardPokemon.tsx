// import { useContext } from "react";
import type { PokemonSimple } from "./pokemon.dummy";
// import { EntrenadorContext } from "../../../context/EntrenadorContext";

export default function CardPokemon({ name, artwork_url }: PokemonSimple) {
  // const context = useContext(EntrenadorContext);
  // console.log(context.entrenador);
  // context.ganarMedalla();
  // console.log(context.entrenador);

  return (
    <div className="bg-white/50 backdrop-blur-md rounded-lg p-4 flex flex-col items-center">
      <h2>{name}</h2>
      <img src={artwork_url} alt={name} />
    </div>
  );
}
