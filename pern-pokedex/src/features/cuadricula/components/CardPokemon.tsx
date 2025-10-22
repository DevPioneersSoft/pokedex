import type { Pokemon } from "../interfaces/Pokemon.interface";

interface CardPokemonProps {
  pokemon: Pokemon,
  callback?: (pokemon: Pokemon) => void,
  isSelected?: boolean
}

export default function CardPokemon({ pokemon, callback, isSelected }: CardPokemonProps) {

  const { nombre, imagen } = pokemon

  return (
    <div
      key={nombre}
      className={`${isSelected ? 'bg-primary-200' : 'bg-white/50'} backdrop-blur-md rounded-lg p-4 flex flex-col items-center`}
      onClick={() => {
        if (callback) callback(pokemon)
      }}
    >
      {isSelected && <span>⭐</span>}
      <h2>{nombre}</h2>
      <img src={imagen} alt={nombre} />
    </div>
  );
}
