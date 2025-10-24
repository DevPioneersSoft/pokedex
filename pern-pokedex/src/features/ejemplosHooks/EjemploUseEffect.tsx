import { useEffect, useState } from 'react';

interface PokemonAPI {
    pokemon: {
        name: string
    }
}

export default function EjemploUseEffect({ tipo }: { tipo: string }) {
    // const [numeroPokebolas, setNumeroPokebolas] = useState(0)

    // const incrementar = () => {
    //     setNumeroPokebolas(numeroPokebolas + 1)
    // }

    // useEffect(() => {
    //     console.log(numeroPokebolas)
    // }, [numeroPokebolas])

    const [pokemones, setPokemones] = useState<PokemonAPI[]>([])
    const [cargando, setCargando] = useState(false)

    const buscarPokemonesPorTipo = async () => {
        setCargando(true)
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`)
            const data = await response.json()
            setPokemones(data.pokemon ?? [])
        } catch (error) {
            console.error("Error buscando pokemon", error)
        } finally {
            setCargando(false)
        }
    }

    useEffect(() => {
        buscarPokemonesPorTipo()
    }, [tipo])

    if (cargando) return <div> Buscando pokemones de tipo {tipo}...</div>

    return (
        <div>
            <h2>Pokemon de tipo</h2>
            {
                pokemones.map(pokemon => (<div key={pokemon.pokemon.name}>{pokemon.pokemon.name}</div>))
            }
        </div>
    )
}
