import type { Pokemon } from "../../interfaces/Pokemon.interface";

interface CardPokemonProps {
  pokemon: Pokemon;
  callback?: (pokemon: Pokemon) => void;
}

export default function CardPokemon({ pokemon, callback }: CardPokemonProps) {
  const { nombre, imagen, id } = pokemon;

  return (
    <div
      key={id}
      className="bg-white/90 backdrop-blur-md rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-white/100 transition-all"
      onClick={() => callback?.(pokemon)}
    >
      <h2 className="text-xl font-bold capitalize mb-2">{nombre}</h2>
      <img src={imagen} alt={nombre} className="w-32 h-32 object-contain" />
      <p className="text-sm text-gray-600 mt-2">#{id.toString().padStart(3, '0')}</p>
    </div>
  );
}
