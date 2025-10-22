import type { PokemonSimple } from "./pokemon.dummy";

export default function CardPokemonV2({id, name, artwork_url}: PokemonSimple) {

  return (
    <div 
      key={id} 
      className="bg-white rounded-xl shadow-lg transition-all hover:shadow-2xl duration-300 hover:scale-105 cursor-pointer overflow-hidden"
    >
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 flex justify-center items-center h-48">
        <img 
          src={artwork_url} 
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 font-semibold">#{id.toString().padStart(3, '0')}</p>
        <h3 className="text-lg font-bold capitalize text-gray-800">{name}</h3>
      </div>
    </div>
  )
}
