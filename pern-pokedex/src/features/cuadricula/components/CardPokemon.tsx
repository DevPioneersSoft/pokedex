import type { PokemonSimple } from "./pokemon.dummy";

export default function CardPokemon({ id, name, artwork_url }: PokemonSimple) {
  return (
    <div
      key={id}
      className="bg-white/50 backdrop-blur-md rounded-lg p-4 flex flex-col items-center"
    >
      <h2>{name}</h2>
      <img src={artwork_url} alt={name} />
    </div>
  );
}
