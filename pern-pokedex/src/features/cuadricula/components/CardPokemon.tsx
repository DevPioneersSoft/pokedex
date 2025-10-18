import type { Pokemon } from "../interfaces/Pokemon.interface";

export default function CardPokemon({ nombre, imagen }: Pokemon) {
  return (
    <div
      key={nombre}
      className="bg-white/50 backdrop-blur-md rounded-lg p-4 flex flex-col items-center"
    >
      <h2>{nombre}</h2>
      <img src={imagen} alt={nombre} />
    </div>
  );
}
