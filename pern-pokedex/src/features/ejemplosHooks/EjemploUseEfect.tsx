import { useEffect, useState } from 'react'

interface PokemonApi {
  pokemon: { name: string; url: string; }
}

export default function EjemploUseEfect({tipo}: {tipo: string}) {

    /*const [numeroPokebolas, setNumeroPokebolas] = useState(0);

    const incrementar = () => {
        setNumeroPokebolas(numeroPokebolas + 1);
    }

    useEffect(() => {
        console.log('Renderizando componente', numeroPokebolas);
    }, [numeroPokebolas]);  */

    const [pokemon, setPokemon] = useState<PokemonApi[]>([]);
    const [cargando, setCargando] = useState(true);

    const buscarPokemonPorTipo = async () => {
        setCargando(true);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
            const data = await response.json();
            setPokemon(data.pokemon ?? []);
        } catch (error) {
            console.error('Error al buscar Pokémon por tipo:', error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        buscarPokemonPorTipo(); 
    }, [tipo]);

    if (cargando) {
        return <div>Cargando...</div>;
    }

  return (
    <div>
        <h2 className='text-white text-3xl font-bold m-4'>Pokémon de tipo {tipo}</h2>
        <ul>
            {pokemon.map((p) => (
                <li key={p.pokemon.name} className='text-white'>{p.pokemon.name}</li>
            ))}
        </ul>
    </div>
  )
}
