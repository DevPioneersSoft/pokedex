import type { Pokemon } from "../interfaces/Pokemon.interface";

interface CardPokemonProps {
  pokemon: Pokemon,
  callback?: (pokemon: Pokemon) => void,
  size?: 'md' | 'lg'
}

const sizes = {
  'md': {
    card: "w-28",
    img: ''
  },
  'lg': {
    card: 'w-36',
    img: ''
  }
}

export default function CardPokemon({ pokemon, callback, size: sizeValor = 'md' }: CardPokemonProps) {

  const { nombre, imagen } = pokemon

  const size = sizes[sizeValor]



  return (
    <div
      key={nombre}
      className={`bg-white/50 backdrop-blur-md rounded-lg  ${size.card} p-4 flex flex-col items-center`}
      onClick={() => {
        if (callback) callback(pokemon)
      }}
    >
      <h2>{nombre}</h2>
      <img src={imagen} alt={nombre} />
    </div>
  );
}
