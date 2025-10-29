import type { Pokemon } from "../interfaces/Pokemon.interface";

interface CardPokemonProps {
  pokemon: Pokemon,
  callback?: (pokemon: Pokemon) => void,
  selected: boolean
}

export default function CardPokemon({ pokemon, callback, selected }: CardPokemonProps) {

  const { nombre, imagen } = pokemon

  return (
    <div
      key={nombre}
      className={`${selected ? 'bg-yellow-500/50' : 'bg-white/50'}  backdrop-blur-md rounded-lg p-4 flex flex-col items-center`}
      onClick={() => {
        if (callback) callback(pokemon)
      }}
    > 
      <h2>{nombre}</h2>
      <img className="max-h-24 object-contain flex-shrink min-h-0" src={imagen} alt={nombre} />
    </div>
  );
}
