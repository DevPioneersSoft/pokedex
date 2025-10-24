import type { Pokemon } from "../interfaces/Pokemon.interface";

interface CardPokemonProps {
  pokemon: Pokemon,
  callback?: (pokemon: Pokemon) => void
  isFavorite?: boolean,
  selected?: boolean

}

export default function CardPokemon({ pokemon, callback, isFavorite = false, selected = false }: CardPokemonProps) {

  const { nombre, imagen } = pokemon

  return (
    <div
      key={nombre}
      className={`${isFavorite ? 'bg-amber-400' : 'bg-white/50 '} ${selected ? "border-4 border-emerald-500 " : "border border-transparent"} hover:cursor-pointer  backdrop-blur-md rounded-lg p-4 flex flex-col items-center`}
      onClick={() => {
        if (callback) callback(pokemon)
      }}
    >
      <h2>{nombre}</h2>
      <img src={imagen} alt={nombre} />
    </div>
  );
}
