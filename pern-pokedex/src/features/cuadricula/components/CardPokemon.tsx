import type { Pokemon } from "../interfaces/Pokemon.interface";

interface CardPokemonProps {
  pokemon: Pokemon,
  callback?: (pokemon: Pokemon) => void
}

export default function CardPokemon({ pokemon, callback }: CardPokemonProps) {

  const { nombre, imagen, id } = pokemon

  return (
    <div
      key={nombre}
      className="
        flex flex-col items-center justify-center
        bg-gradient-to-b from-slate-800 to-slate-700
        rounded-2xl shadow-md hover:shadow-xl
        hover:scale-105 transition-all duration-200
        p-4 cursor-pointer border border-slate-600"
      onClick={() => {
        if (callback) callback(pokemon)
      }}
    >
      <img
        src={imagen}
        alt={nombre}
        className="w-24 h-24 object-contain mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
      />
      <p className="text-white font-semibold capitalize tracking-wide text-sm">
        {nombre}
      </p>
      <span className="text-gray-400 text-xs mt-1">#{String(id).padStart(3, "0")}</span>
    </div>
  );
}
