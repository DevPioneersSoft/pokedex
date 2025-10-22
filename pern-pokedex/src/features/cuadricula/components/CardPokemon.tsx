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
      className="bg-black/50 backdrop-blur-md rounded-lg p-4 flex flex-col items-center" 
      onClick={() => {
        if (callback) callback(pokemon)
      }}
    >
      <h2 style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            textTransform: "capitalize"
          }}>{nombre}</h2>
      <img src={imagen} alt={nombre} 
        style={{ 
            width: '70%', 
            height: '70%',
            objectFit: 'contain' 
        }}/>
        <h3 style={{
            textAlign: "center",
            color: "gray",
          }}>{`#${id}`}</h3>
    </div>
  );
}
