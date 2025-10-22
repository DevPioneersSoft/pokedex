import type { Pokemon } from "../../interfaces/Pokemon.interface";

interface CardPokemonProps {
  pokemon: Pokemon
  callback?: (pokemon: Pokemon) => void
}

export default function CardPokemon({ pokemon, callback }: CardPokemonProps) {

  const { id, nombre, imagen } = pokemon

  return (

    <>

      <div key={id} className="rounded-t-lg border-10 border-double border-black-100 bg-gray-200 font-sans text-lg text-center text-black mx-5 my-5  shadow-xl">
      <div
      key={nombre}
     
      onClick={() => {
        if (callback) callback(pokemon)
      }}
    >
     
        <div className="uppercase bg-gray-500">{nombre}</div>
        <img src={imagen} alt={nombre}></img>
         </div>
      </div>
    </>
  );
}
