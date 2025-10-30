import type { Pokemon } from "../../interfaces/Pokemon.interface";
import useFavoritos from "../../ejemploHooks/hooks/useFavoritos";
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';


interface CardPokemonProps {
  pokemon: Pokemon;
  callback?: (pokemon: Pokemon) => void;
  enEquipo?: boolean;
  onAgregarEquipo?: (pokemon: Pokemon) => void;
  equipoLleno?: boolean;
}

export default function CardPokemon({ pokemon, callback, enEquipo = false, onAgregarEquipo, equipoLleno = false }: CardPokemonProps) {
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
      className={`relative rounded-lg flex flex-col items-center transition-all select-none
        ${enEquipo
          ? "bg-blue-900/80 border-4 border-black scale-110 p-5"
          : "bg-white/90 backdrop-blur-md hover:bg-white/100 border-2 border-transparent p-4"}
      `}
      style={{ cursor: onAgregarEquipo && !equipoLleno ? 'pointer' : 'default', transition: 'transform 0.2s, box-shadow 0.2s' }}
      onClick={() => {
        if (onAgregarEquipo && !equipoLleno) onAgregarEquipo(pokemon);
      }}
      tabIndex={onAgregarEquipo && !equipoLleno ? 0 : -1}
      aria-disabled={equipoLleno}
    >
      {/* estrellita de favorito */}
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

      {/* signo de pregunta para descripcion */}
      {callback && (
        <button
          type="button"
          onClick={e => { e.stopPropagation(); callback(pokemon); }}
          className="absolute left-3 top-3 hover:scale-105 transition-transform p-1 focus:outline-none"
          title="Mostrar información"
          aria-label="Mostrar información"
        >
          <span role="img" aria-label="info" className="text-blue-400 text-xl">?</span>
        </button>
      )}

      <h2 className="text-xl font-bold capitalize mb-2">{nombre}</h2>
      <img src={imagen} alt={nombre} className="w-32 h-32 object-contain" />
      <p
        className={`text-sm mt-2 font-bold ${enEquipo ? "text-black absolute left-3 bottom-3" : "text-gray-600"}`}
        style={{ minWidth: '48px', textAlign: 'left' }}
      >
        #{id.toString().padStart(3, '0')}
      </p>
      {enEquipo && (
        <span className="absolute bottom-3 right-3 bg-blue-800/80 text-white text-xs px-2 py-1 rounded shadow">En equipo</span>
      )}
    </div>
  );
}
