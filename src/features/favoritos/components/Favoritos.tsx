
import { useTodosLosPokemones } from '../../ejemploHooks/hooks/useTodosLosPokemones';
import useFavoritos from '../../ejemploHooks/hooks/useFavoritos';
import Header from '../../layout/components/Header';
import CardPokemon from '../../layout/components/CardPokemon';
import { useEquipo } from '../../ejemploHooks/hooks/useEquipo';

export default function Favoritos() {
    const { data: todosLosPokemones = [] } = useTodosLosPokemones();
    const { favoritos } = useFavoritos();
    const equipoHook = useEquipo();

    const favoritosList = todosLosPokemones.filter(p => favoritos.includes(p.id));

    return (
        <div className="min-h-screen w-full bg-blue-900">
            <Header />
            <h1 className="text-3xl text-center text-white my-6">Mis Favoritos</h1>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 p-2 justify-center">
                {favoritosList.map((pokemon) => (
                    <CardPokemon
                        key={pokemon.id}
                        pokemon={pokemon}
                        callback={undefined}
                        enEquipo={equipoHook.estaEnEquipo(pokemon.id)}
                        onAgregarEquipo={equipoHook.equipoLleno && !equipoHook.estaEnEquipo(pokemon.id) ? undefined : () => equipoHook.estaEnEquipo(pokemon.id) ? equipoHook.quitarPokemon(pokemon.id) : equipoHook.agregarPokemon(pokemon)}
                        equipoLleno={equipoHook.equipoLleno}
                    />
                ))}
            </div>
        </div>
    );
}
