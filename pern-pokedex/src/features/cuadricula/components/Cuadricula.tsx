import { pokemonDummies } from "./pokemon.dummy";
import "./cuadricula.css";
import CardPokemon from "./CardPokemon";

export default function Cuadricula() {
  return (
    <div
      className="grid 
                  gap-3 
                  [grid-template-columns:repeat(auto-fit,minmax(theme(spacing.28),1fr))] 
                  rounded-2xl 
                  p-6"
    >
      {pokemonDummies.map((pokemon, index) => (
        <CardPokemon
          key={index}
          id={index}
          name={pokemon.name}
          artwork_url={pokemon.artwork_url}
        />
      ))}
    </div>
  );
}
