import type { Pokemon } from "../interfaces/Pokemon.interface";

interface CardPokemonProps {
  pokemon: Pokemon,
  callback?: (pokemon: Pokemon) => void
}

export default function CardPokemon({ pokemon, callback }: CardPokemonProps) {

  const { nombre, imagen } = pokemon

  return (
    <div
      key={nombre}
      className="bg-white/50 backdrop-blur-md rounded-lg p-4 flex flex-col items-center"
      onClick={() => {
        if (callback) callback(pokemon)
      }}
    >
      <h2>{nombre}</h2>
      <img src={imagen} alt={nombre} />
    </div>
  );
}

// export default function CardPokemon({ pokemon, callback }: CardPokemonProps) {
//   const { nombre, imagen, id } = pokemon;
//   const { favoritos, toggleFav } = useFavoritos();

//   const esFavorito = favoritos.includes(id);

//   return (
//     <div
//       key={nombre}
//       onClick={() => callback && callback(pokemon)}
//       className={`relative rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all duration-300 
//         ${esFavorito
//           ? "bg-yellow-300/60 shadow-lg shadow-yellow-400/40"
//           : "bg-white/40 hover:bg-white/60 backdrop-blur-md"
//         }`}
//     >
//       {/* Favorite toggle checkbox */}
//       <input
//         type="checkbox"
//         checked={esFavorito}
//         onClick={(e) => e.stopPropagation()}
//         onChange={() => toggleFav(pokemon)}
//         className="absolute top-2 right-2 w-5 h-5 cursor-pointer"
//       />

//       {/* Pokémon content */}
//       <img
//         src={imagen}
//         alt={nombre}
//         className="h-24 w-24 object-contain mb-2 drop-shadow-md"
//       />
//       <h2 className="text-lg font-semibold text-center text-gray-800 capitalize">
//         {nombre}
//       </h2>
//     </div>
//   );
// }
