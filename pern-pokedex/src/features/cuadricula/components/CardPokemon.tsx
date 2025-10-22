import type {Pokemon} from "../interfaces/Pokemon.interface";

interface CardPokemonProps {
    pokemon: Pokemon,
    callback?: (pokemon: Pokemon) => void,
    favorito?: boolean
}

export default function CardPokemon({pokemon, callback, favorito}: CardPokemonProps) {

    const {nombre, imagen} = pokemon

    return (
        <div
            key={nombre}
            className="bg-white/50 backdrop-blur-md rounded-lg p-4 flex flex-col items-center"
            onClick={() => {
                if (callback) callback(pokemon)
            }}
        >
            {favorito ? <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">Favorito</div> : null}
            <h2>{nombre}</h2>
            <img src={imagen} alt={nombre}/>
        </div>
    );
}
