import { useEquipo } from "../../ejemploHooks/hooks/useEquipo";
import CardPokemon from "../../layout/components/CardPokemon";

export default function Equipo3() {
  const { equipo, quitarPokemon, maximo, isLoading, error } = useEquipo();

  return (
    <div className="min-h-screen w-full bg-blue-900">
      <h1 className="text-3xl text-center text-white my-6">Mi Equipo Pokémon</h1>
        <div className="flex flex-wrap gap-6 justify-center">
            {isLoading && <p className="text-white/80">Cargando equipo...</p>}
            {error && <p className="text-red-400">Error al cargar pokémon</p>}
            {equipo.length === 0 && !isLoading && (
            <p className="text-white/80">No tienes pokémon en tu equipo.</p>
            )}
            {equipo.map((pokemon) => (
            <div key={pokemon.id} className="relative">
                <CardPokemon
                pokemon={pokemon}
                enEquipo={true}
                onAgregarEquipo={() => quitarPokemon(pokemon.id)}
                />
            </div>
            ))}
        </div>
      <div className="text-center mt-6 text-white/80">
        {equipo.length} / {maximo} pokémon en el equipo
      </div>
    </div>
  );
}
