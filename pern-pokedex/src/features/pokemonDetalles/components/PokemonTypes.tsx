const typeColors: Record<string, string> = {
    normal: "bg-gray-400 text-black",
    fire: "bg-red-500 text-white",
    water: "bg-blue-500 text-white",
    grass: "bg-green-500 text-white",
    electric: "bg-yellow-400 text-black",
    ice: "bg-cyan-400 text-black",
    fighting: "bg-red-700 text-white",
    poison: "bg-purple-600 text-white",
    ground: "bg-yellow-700 text-white",
    flying: "bg-indigo-400 text-white",
    psychic: "bg-pink-500 text-white",
    bug: "bg-lime-600 text-white",
    rock: "bg-stone-500 text-white",
    ghost: "bg-violet-700 text-white",
    dragon: "bg-indigo-700 text-white",
    dark: "bg-gray-800 text-white",
    steel: "bg-slate-400 text-black",
    fairy: "bg-pink-300 text-black",
}

interface PokemonTypesProps {
    types: string[]
}

export default function PokemonTypes({ types }: PokemonTypesProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {types.map((type) => (
                <span
                    key={type}
                    className={` 
                        px-3 py-1 rounded-full font-mono font-bold uppercase 
                        border-2 border-black shadow-md
                        ${typeColors[type] ?? "bg-gray-300 text-black"} 
                    `}>
                    {type}
                </span>
            ))}
        </div>
    )
}
