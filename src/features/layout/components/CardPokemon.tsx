import type { Pokemon } from "../../interfaces/Pokemon.interface";
import useFavoritos from "../../ejemploHooks/hooks/useFavoritos";
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

interface CardPokemonProps {
  pokemon: Pokemon;
  callback?: (pokemon: Pokemon) => void;
}

export default function CardPokemon({ pokemon, callback }: CardPokemonProps) {
  const { nombre, imagen, id } = pokemon;
  const { favoritos, toggleFavorito } = useFavoritos();

  // colorear la estrellita si es favorito
  const esFavorito = favoritos.includes(id);

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorito(pokemon);
  };

  return (
    <div
      key={id}
      className="relative bg-white/90 backdrop-blur-md rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-white/100 transition-all"
      onClick={() => callback?.(pokemon)}
    >
      <button
        type="button"
        aria-pressed={esFavorito}
        aria-label={esFavorito ? "Quitar favorito" : "Agregar favorito"}
        onClick={handleStarClick}
        className="absolute right-3 top-3 hover:scale-105 transition-transform p-1 focus:outline-none"
        title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        {esFavorito ? (
          <StarSolid className="h-6 w-6 text-yellow-400" aria-hidden="true" data-testid="star-fav" />
        ) : (
          <StarOutline className="h-6 w-6 text-gray-300" aria-hidden="true" data-testid="star-no-fav" />
        )}
      </button>

      <h2 className="text-xl font-bold capitalize mb-2">{nombre}</h2>
      <img src={imagen} alt={nombre} className="w-32 h-32 object-contain" />
      <p className="text-sm text-gray-600 mt-2">#{id.toString().padStart(3, '0')}</p>
    </div>
  );
}
