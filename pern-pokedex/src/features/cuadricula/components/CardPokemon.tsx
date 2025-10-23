import type { Pokemon } from "../interfaces/Pokemon.interface";

interface CardPokemonProps {
  pokemon: Pokemon;
  callback?: (pokemon: Pokemon) => void;
  esFavorito: boolean;
  toggleFav: () => void;
}

export default function CardPokemon({ pokemon, callback, esFavorito, toggleFav }: CardPokemonProps) {
  const { nombre, imagen } = pokemon;

  return (
    <div
      onClick={() => callback && callback(pokemon)}
      className={`relative rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all duration-300 
        ${esFavorito
          ? "bg-yellow-300/60 shadow-lg shadow-yellow-400/40"
          : "bg-white/40 hover:bg-white/60 backdrop-blur-md"
        }`}
    >
      {/* favorito */}
      <input
        type="checkbox"
        checked={esFavorito}
        onChange={(e) => { e.stopPropagation(); toggleFav(); }}
        className="absolute top-2 right-2 w-5 h-5 cursor-pointer"
      />

      <img
        src={imagen}
        alt={nombre}
        className="h-24 w-24 object-contain mb-2 drop-shadow-md"
      />
      <h2 className="text-lg font-semibold text-center text-gray-800 capitalize">
        {nombre}
      </h2>
    </div>
  );
}
