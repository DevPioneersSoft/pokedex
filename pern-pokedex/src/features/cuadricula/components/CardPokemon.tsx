import type { Pokemon } from "../interfaces/Pokemon.interface";
import { useFavoritos } from "../../layout/hooks/useFavoritos";
import { StarIcon } from "@heroicons/react/24/outline"; 
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

interface CardPokemonProps {
  pokemon: Pokemon,
  callback?: (pokemon: Pokemon) => void
  onSelected?: boolean
  isFav?: boolean
  onToggleFavorito?: (pokemon: Pokemon) => void
}

export default function CardPokemon({ 
  pokemon, 
  callback, 
  onSelected, 
  isFav, 
  onToggleFavorito }: CardPokemonProps) {
  const { nombre, imagen } = pokemon;

  const { favoritos, toggleFavorito } = useFavoritos();
  const favSelected = typeof isFav === "boolean" ? isFav : favoritos.includes(pokemon.id);
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    (onToggleFavorito ?? toggleFavorito)(pokemon);
  };

  const baseClass = "backdrop-blur-md rounded-lg p-4 flex flex-col items-center relative transition";
  const bgClass = onSelected ? "bg-white/100" : "bg-white/50";
  const favRing = favSelected ? "ring-2 ring-yellow-400" : "";
  const containerClass = `${bgClass} ${favRing} ${baseClass}`;

  return (
    <div
      key={nombre}
      className={containerClass}
      onClick={() => callback?.(pokemon)}
    >
      <button
        type="button"
        aria-label={favSelected ? "Quitar de favoritos" : "Agregar a favoritos"}
        onClick={handleToggle}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black/20 hover:bg-black/30"
      >
        {favSelected ? (
          <StarSolid className="w-5 h-5 text-yellow-400" />
        ) : (
          <StarIcon className="w-5 h-5 text-yellow-400" />
        )}
      </button>

      <h2>{nombre}</h2>
      <img src={imagen} alt={nombre} />
    </div>
  );
}
